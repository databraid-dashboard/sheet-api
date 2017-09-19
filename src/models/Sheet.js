
/* eslint-disable class-methods-use-this */
class Sheet {
  constructor(sheet) {
    this.range = sheet.range;
    this.majorDimension = sheet.majorDimension;
    this.values = sheet.values;
  }
  get sheetName() {
    return this.range.match(/[^!]*/i)[0];
  }
}

module.exports = Sheet;
