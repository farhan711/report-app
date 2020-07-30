const sendMail = require('./email')
const { getUsers } = require('./get_users')
const generateExcel = require('./generate_sheet')

exports.handler = async (event, context) => {
    console.log('Lambda Invoked from Trigger', event)
    const { toAddresses, reportType } = event
    console.log('To Addresses', toAddresses, 'Report Type', reportType)

    const users = await getUsers(reportType).catch(err => {
        console.log('Get Users Error', err)
        context.fail(err)
        return
    })

    const excelFile = generateExcel(users, false)
    const info = await sendMail(toAddresses, excelFile).catch(err => {
        context.fail(err)
        return
    })

    console.log('Email Sent!', info)
    context.succeed(info)

};
