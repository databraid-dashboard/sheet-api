const data = require('../mockdata');
const Sheet = require('./Sheet');
/* eslint-disable class-methods-use-this */


class Spreadsheet {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
    this.spreadSheetData = data.SPREADSHEET_DATA;
  }
  get sheets() {
    // const sheetNames = this.spreadSheetData.sheets.map(sheet => sheet.properties.title);
    const sheetDataArr = [data.SHEET1_DATA, data.SHEET2_DATA];
    return sheetDataArr.map(sheetData => new Sheet(sheetData));
  }
}

module.exports = Spreadsheet;
