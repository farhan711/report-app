const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { v4: uuidv4 } = require('uuid');

const sendMail = require('./email')
const generateExcel = require('./generate_sheet')
const { getUsers } = require('./get_users')
const { addCloudWatchTriggerEvent } = require('./cloudwatch_functions')

const AWSConfig = require('./config')
const sqs = new AWS.SQS(AWSConfig())

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


// send email report right without schedule
app.post('/send-now', async function (req, res) {
  const { toAddresses, reportType } = req.body

  const users = await getUsers(reportType).catch(err => {
    res.status(500).send(err)
    return
  })

  const excelFile = generateExcel(users, false)
  const info = await sendMail(toAddresses, excelFile)

  res.json({ success: 'Success', message: 'Email Sent Successfully!', info })
})


// download report excel file
app.post('/download', async function (req, res) {
  const { reportType } = req.body

  const users = await getUsers(reportType)

  const excelFile = generateExcel(users, true)

  res.json({ success: 'get call succeed!', url: req.url, excelFile });
});


// schedule email to be sent after sometime on the same day
app.post('/schedule-email', function (req, res) {
  const { toAddresses, sendAt, reportType } = req.body

  const params = {
    MessageBody: JSON.stringify({ toAddresses, sendAt, reportType }),
    QueueUrl: process.env['queue_url'],
    DelaySeconds: 0
  }
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('SQS Error', err)
      res.status(500).send(err)
      return
    }
    res.json({ success: 'Scheduled Email Success!', url: req.url, data })
  })
});

// send email on a specified intervals i.e, daily,weekly,monthly
app.post('/set-interval', async function (req, res) {

  const { timeInterval, toAddresses, reportType } = req.body

  const dailyCronExpression = "cron(0 23 * * ? *)"   // runs everyday at 23:00
  const weeklyCronExpression = "cron(0 23 ? * SAT *)" // runs every Saturday at 23:00
  const monthlyCronExpression = "cron(0 23 30 * ? *)" // runs every 30th day of the month at 23:00

  let cronExpression
  switch (timeInterval) {
    case 'daily':
      cronExpression = dailyCronExpression
      break;
    case 'weekly':
      cronExpression = weeklyCronExpression
      break;
    case 'monthly':
      cronExpression = monthlyCronExpression
      break;
    default:
      break;
  }

  const ruleName = `Trigger-Cron-${uuidv4()}`
  const lambdaArn = "arn:aws:lambda:us-east-1:639695405324:function:cloudwatchLambda-dev"
  await addCloudWatchTriggerEvent(ruleName, cronExpression, lambdaArn, { toAddresses, reportType }).catch(err =>{
    res.status(500).send(err)
    return
  })

  res.json({ success: 'Success', message: 'CloudWatch Event and Target Lambda Added Successfully!' })

})

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
