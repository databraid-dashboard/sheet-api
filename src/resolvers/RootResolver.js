
const Spreadsheet = require('../models/Spreadsheet');
const Sheets = require('../models/Sheets');


const root = {
  sheets(spreadsheetId, sheetName) {
    return new Sheets(spreadsheetId, sheetName);
  },

  spreadsheet(spreadsheetId) {
    return new Spreadsheet(spreadsheetId);
  },
};

module.exports = root;
