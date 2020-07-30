const nodemailer = require('nodemailer')

const AWS = require('aws-sdk');
const AWSConfig = require('./config')

const ses = new AWS.SES(AWSConfig())


function sendMail(to, attachment, subject, message) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: process.env['senderEmail'],
        subject: subject || 'Report',
        html: message || 'Please find the attached file',
        to,
        attachments: [
          {
            filename: `Report-${new Date().getTime()}.xlsx`,
            content: attachment
          }
        ]
      };
  
      const transporter = nodemailer.createTransport({ SES: ses })
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log('Email Error', err)
          reject(err)
          return
        }
        resolve({ info })
      })
    })
  }

  module.exports = sendMail
