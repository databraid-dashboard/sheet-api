const User = require('../models/User');
const Spreadsheet = require('../models/Spreadsheet');
const Sheets = require('../models/Sheets');

const root = {
  user(userName) {
    return new User(userName);
  },

  sheets(spreadsheetId, sheetName) {
    return new Sheets(spreadsheetId, sheetName);
  },

  spreadsheet(spreadsheetId) {
    return new Spreadsheet(spreadsheetId);
  },
};

module.exports = root;
