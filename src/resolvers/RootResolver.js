const User = require('../models/User');
const Spreadsheet = require('../models/Spreadsheet');
const Sheet = require('../models/Sheet');

const root = {
  user(userName) {
    return new User(userName);
  },

  sheet(sheetName) {
    return new Sheet(sheetName);
  },

  spreadsheet(spreadsheetId) {
    return new Spreadsheet(spreadsheetId);
  },
};

module.exports = root;
