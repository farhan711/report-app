const AWS = require('aws-sdk')

const sendMail = require('./email')
const generateExcel = require('./generate_sheet')
const { getUsers } = require('./get_users')

const AWSConfig = require('./config')
const sqs = new AWS.SQS(AWSConfig())

/**
 * This lambda is invoked by sqsConsumerLambda functions with the email payload. After the email is sent successfully 
 * this lambda takes care of deleting the message from SQS so it cannot be consumed again again.
 */
exports.handler = async (event, context) => {
    const body = JSON.parse(event.Body)
    const { toAddresses, reportType } = body
    const { ReceiptHandle } = event

    console.log('Event Body Console', event.Body)
    console.log('Event Receipt Handle', ReceiptHandle)

    const users = await getUsers(reportType).catch(err => {
        context.fail(err)
        return
    })

    const excelFile = generateExcel(users, false)
    const info = await sendMail(toAddresses, excelFile).catch(err => {
        context.fail(err)
        return
    })

    // if email is sent successfully the message is deleted from SQS to avoid duplication
    const qParams = {
        QueueUrl: process.env['queue_url'],
        ReceiptHandle: ReceiptHandle
    }
    await sqs.deleteMessage(qParams).promise()
    context.succeed(info)
};
