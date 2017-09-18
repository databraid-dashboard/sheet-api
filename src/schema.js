const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    userName: String!
  }

  type Spreadsheet {
    spreadsheetId: String
    sheets: [Sheet]
  }

  type Sheet {
    sheetName: String
    range: String
    values: [[String]]
  }

  type Query {
    user(userName: String): User
    sheet(sheetName: String): Sheet
    spreadsheet(spreadsheetId: String): Spreadsheet
  }
`);

module.exports = schema;
