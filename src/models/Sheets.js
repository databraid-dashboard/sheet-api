const data = require('../mockdata');
const Sheet = require('./Sheet');
/* eslint-disable class-methods-use-this */
class Sheets {
  constructor({ spreadsheetId, sheetName }) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
  }
  get sheets() {
    return this.sheetName ? [new Sheet(data.SHEET1_DATA)] : this.getAllUserSheets;
  }
  get getAllUserSheets() {
    const sheetDataArr = [data.SHEET1_DATA, data.SHEET2_DATA];
    return sheetDataArr.map(sheetData => new Sheet(sheetData));
  }
}

module.exports = Sheets;
