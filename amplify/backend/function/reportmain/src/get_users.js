const connectMongoDB = require('./db')

exports.getUsers =  async function (reportType) {
    return new Promise(async (resolve, reject) => {
      // connect to mongodb  and get the db object
      const db = await connectMongoDB().catch(err => {
        reject(err)
        return
      })
      const users = await db.collection('users').find({}).project(getFieldsToFetch(reportType)).toArray()
      resolve(users)
    })
  }

// get fields to be fetched from db depending upon report type
function getFieldsToFetch(reportType) {
    switch (reportType) {
      case 'all':
        return { 'name': 1, 'email': 1, 'phone': 1, 'username': 1, 'address': 1 }
      case 'email':
        return { 'name': 1, 'email': 1 }
      case 'phone':
        return { 'name': 1, 'phone': 1 }
      default:
        break;
    }
  }
  