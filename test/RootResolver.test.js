/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const root = require('../src/resolvers/RootResolver');

//TODO: ALL tests will need to be refactored when the backend is making calls
      // to the Google API

describe('RootResolver model', () => {
  it('should have a spreadsheet function', () => {
    expect(root.spreadsheet).to.be.a('function');
  });

  it('should have a sheet function', () => {
    expect(root.sheet).to.be.a('function');
  });
});
