var xlsx = require('xlsx')
var spreadsheet = require('./spreadsheet.xlsx')

test('basic spreadsheet loading', () => {
  expect(spreadsheet.SheetNames).toEqual(jasmine.arrayContaining([jasmine.any(String)]))

  const csvString = xlsx.utils.sheet_to_csv(spreadsheet.Sheets['Sheet1'])

})
