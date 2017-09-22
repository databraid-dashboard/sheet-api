/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const Sheets = require('../src/models/Sheets');
const data = require('../src/mockdata');

// TODO: ALL tests will need to be refactored when the backend is making calls
// to the Google API

describe('Sheets model', () => {
  it('should take in a spreadsheetId', () => {
    const sheet = new Sheets({ spreadsheetId: '12345' });
    expect(sheet.spreadsheetId).to.equal('12345');
  });
  it('should take in a sheetName', () => {
    const sheet = new Sheets({ sheetName: '12345' });
    expect(sheet.sheetName).to.equal('12345');
  });

  it('should fetch all sheets if no sheet name is given', () => {
    const sheet = new Sheets({ spreadsheetId: '12345' });
    sinon.stub(sheet, 'getAllUserSheets').returns([data.SHEET1_DATA, data.SHEET2_DATA]);
  });
  it('should fetch one sheet sheet name is given', () => {
    const sheet = new Sheets({ spreadsheetId: '12345', sheetName: 'Sheet1' });
    sinon.stub(sheet, 'sheets').returns([data.SHEET1_DATA]);
  });
});
