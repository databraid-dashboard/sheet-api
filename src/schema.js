const { buildSchema } = require('graphql');


const schema = buildSchema(`

  type Spreadsheet {
    spreadsheetId: String
    spreadSheetName: String
    sheets: [String]
  }
  type Sheets {
    spreadsheetId: String
    sheets: [Sheet]
  }

  type Sheet {
    range: String
    majorDimension: String
    values: [[String]]
    sheetName: String
  }

  type Query {
    sheets(spreadsheetId: String, sheetName: String): Sheets
    spreadsheet(spreadsheetId: String): Spreadsheet
  }
`);

module.exports = schema;
