const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    userName: String!
  }

  type Spreadsheet {
    spreadsheetId: String
    sheets: [Sheet]
  }
  type Sheets {
    spreadsheetId: String
    sheetName: String
    sheets: [Sheet]
  }

  type Sheet {
    sheetName: String
    range: String
    majorDimension: String
    values: [[String]]
  }

  type Query {
    user(userName: String): User
    sheets(spreadsheetId: String, sheetName: String): Sheets
    spreadsheet(spreadsheetId: String): Spreadsheet
  }
`);

module.exports = schema;
