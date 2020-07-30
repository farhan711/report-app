const AWS = require('aws-sdk');

const AWSConfig = require('./config')
const lambda = new AWS.Lambda(AWSConfig())
const cloudWatchEvents = new AWS.CloudWatchEvents({ ...AWSConfig(), apiVersion: '2015-10-07' })

exports.addCloudWatchTriggerEvent = function (ruleName, cronExpression, lambdaArn, data) {
    return new Promise(async (resolve, reject) => {
        const ruleArn = await cloudWatchPutRule(ruleName, cronExpression).catch(err => {
            reject(err)
            return
        })
        await addPermissionLambda(ruleArn, ruleName).catch(err => {
            reject(err)
            return
        })
        await cloudWatchAddTargets(ruleName, data, lambdaArn).catch(err => {
            reject(err)
            return
        })
        resolve(true)
    })
}

function cloudWatchPutRule(ruleName, cronExpression) {
    return new Promise((resolve, reject) => {
        console.log('Cron Expression', cronExpression)
        const cloudWatchEventParams = {
            Name: ruleName,
            ScheduleExpression: cronExpression,
            State: 'ENABLED'
        }

        cloudWatchEvents.putRule(cloudWatchEventParams, function (err, data) {
            if (err) {
                console.log('Cloud Watch Put Rule Error', err)
                reject(err)
                return
            } else {
                console.log('Cloud Watch Put Rule Success', data.RuleArn)
                resolve(data.RuleArn)
            }
        })
    })
}

function addPermissionLambda(ruleArn, ruleName) {
    return new Promise((resolve, reject) => {
        const lambdaParams = {
            Action: 'lambda:InvokeFunction',
            FunctionName: 'cloudwatchLambda-dev',
            Principal: "events.amazonaws.com",
            SourceArn: ruleArn,
            StatementId: ruleName
        }
        lambda.addPermission(lambdaParams, function (err, data) {
            if (err) {
                console.log('Lambda Add Permission Error', err)
                reject(err)
                return
            }
            else {
                console.log('Lambda Add Permission Success', data)
                resolve(data)
            }
        })
    })
}

function cloudWatchAddTargets(ruleName, data, lambdaArn) {
    return new Promise((resolve, reject) => {

        const targetParams = {
            Rule: ruleName,
            Targets: [
                {
                    Arn: lambdaArn,
                    Id: "CronCloudWatchEventsTarget",
                    Input: JSON.stringify(data)
                }
            ]
        };

        cloudWatchEvents.putTargets(targetParams, function (err, data) {
            if (err) {
                console.log("Add Target Error", err);
                reject(err)
                return
            } else {
                console.log("Add Target Success", data);
                resolve(data)
            }
        });
    })

}
