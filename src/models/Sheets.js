const Sheet = require('./Sheet');
const fetch = require('isomorphic-fetch');
/* eslint-disable class-methods-use-this */
function getJson(response) {
  return response.json();
}
function createSheetInstances(sheets) {
  return sheets.map(sheet => new Sheet(sheet));
}
class Sheets {
  constructor({ spreadsheetId, sheetName }) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
    this.sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${sheetName}!A1:ZZ?access_token=${process.env.TKN}`;
    this.spreadSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}?access_token=${process.env.TKN}`;
  }
  get sheets() {
    return this.sheetName ? this.getSheetByName() : this.getAllUserSheets();
  }
  getSheetByName() {
    return fetch(this.sheetUrl)
      .then(response => getJson(response))
      .then(data => [new Sheet(data)])
      .catch(err => err);
  }
  getAllUserSheets() {
    return fetch(this.spreadSheetUrl)
      .then(getJson)
      .then(response => response.sheets.map(sheet => sheet.properties.title))
      .then(sheetNames => sheetNames.map(sheetName => fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${sheetName}!A1:ZZ?access_token=${process.env.TKN}`),
      ))
      .then(promiseArray => Promise.all(promiseArray))
      .then(responses => responses.map(response => response.json()))
      .then(responses => Promise.all(responses))
      .then(createSheetInstances)
      .catch(err => console.log(err));
  }
}

module.exports = Sheets;
