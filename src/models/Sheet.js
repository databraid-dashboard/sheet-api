class Sheet {
  constructor(sheet) {
    this.range = sheet.range;
    this.majorDimension = sheet.majorDimension;
    this.values = sheet.values;
  }
}

module.exports = Sheet;
