const mongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://ec2-54-85-48-49.compute-1.amazonaws.com:27017'

module.exports = function connectMongoDB() {
    return new Promise((resolve, reject) => {
      mongoClient.connect(mongoURL, function (err, client) {
        if (err) {
          console.log('Error Connecting DB', err)
          reject(err)
        } else {
          const db = client.db('reportapp')
          resolve(db)
        }
      })
    })
  }
