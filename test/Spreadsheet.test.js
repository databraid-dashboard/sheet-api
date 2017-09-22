/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const Spreadsheet = require('../src/models/Spreadsheet');
// TODO: ALL tests will need to be refactored when the backend is making calls
// to the Google API

describe('Spreadsheet model', () => {
  it('should work', () => {
    expect(true).to.be.ok;
  });

  it('should take in a spreadsheetId', () => {
    const spreadsheet = new Spreadsheet({ spreadsheetId: '1UcfQsQGTAAtjvyxv948z3hf0qiUnMNZF90-GcD7MF9g' });
    expect(spreadsheet.spreadsheetId).to.equal('1UcfQsQGTAAtjvyxv948z3hf0qiUnMNZF90-GcD7MF9g');
  });
});
