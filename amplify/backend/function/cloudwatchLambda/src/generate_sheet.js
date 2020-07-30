const xlsx = require('xlsx')

module.exports = function generateExcel(users, download){
      // create a new workbook
  const workbook = xlsx.utils.book_new()
  workbook.Props = {
    Title: 'Report',
    Subject: 'Report Type',
    CreatedDate: new Date()
  }

  // add a Sheet to workbook
  workbook.SheetNames.push('Sheet 1')

  // generate and data to be added to the workbook Sheet
  const data = generateSheetData(users)
  const workSheetData = xlsx.utils.aoa_to_sheet(data)
  workbook.Sheets['Sheet 1'] = workSheetData

  // convert the file into binary to be transfered 
  const type = download ? 'binary' : 'buffer'
  return xlsx.write(workbook, { type, bookType: 'xlsx' })
} 


function generateSheetData(users) {
    let data = []
    users.forEach(user => {
      let row = []
      if (user.name) row.push(user.name)
      if (user.email) row.push(user.email)
      if (user.username) row.push(user.username)
      if (user.phone) row.push(user.phone)
      if (user.address) row.push(user.address)
      data.push(row)
    })
    return data
  }
