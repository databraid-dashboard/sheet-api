
const fetch = require('isomorphic-fetch');
/* eslint-disable class-methods-use-this */
function getJson(response) {
  return response.json();
}
class Spreadsheet {
  constructor({ spreadsheetId }) {
    this.spreadsheetId = spreadsheetId;
    this.spreadSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?access_token=${process.env.TKN}`;
  }
  get spreadSheetName() {
    return fetch(this.spreadSheetUrl)
      .then(response => getJson(response))
      .then(data => data.properties.title);
  }
  get sheets() {
    return fetch(this.spreadSheetUrl)
      .then(response => getJson(response))
      .then(data => data.sheets.map(sheet => sheet.properties.title));
  }
}

module.exports = Spreadsheet;
