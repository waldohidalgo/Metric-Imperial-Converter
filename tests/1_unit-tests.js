const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", function () {
    convertHandler.isValid("5gal");
    assert.equal(convertHandler.getNum("5gal"), 5, "5gal should return 5");
  });

  test("convertHandler should correctly read a decimal number input.", function () {
    convertHandler.isValid("5.5gal");
    assert.equal(
      convertHandler.getNum("5.5gal"),
      5.5,
      "5.5gal should return 5.5"
    );
  });

  test("convertHandler should correctly read a fractional input.", function () {
    convertHandler.isValid("1/2gal");
    assert.equal(
      convertHandler.getNum("1/2gal"),
      0.5,
      "1/2gal should return 0.5"
    );
  });

  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    convertHandler.isValid("1.5/2gal");
    assert.equal(
      convertHandler.getNum("1.5/2gal"),
      0.75,
      "1.5/2gal should return 0.75"
    );
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
    convertHandler.isValid("3/2/3gal");
    assert.equal(
      convertHandler.getNum("3/2/3gal"),
      "invalid number",
      "3/2/3gal should return invalid number"
    );
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    convertHandler.isValid("gal");
    assert.equal(
      convertHandler.getNum("gal"),
      1,
      "gal should return 1 when no number is provided"
    );
  });

  test("convertHandler should correctly read each valid input unit.", function () {
    convertHandler.isValid("5gal");
    assert.equal(
      convertHandler.getUnit("5gal"),
      "gal",
      "5gal should return gal"
    );
  });

  test("convertHandler should correctly return an error for an invalid input unit.", function () {
    convertHandler.isValid("5gald");
    assert.equal(
      convertHandler.getUnit("5gald"),
      "invalid unit",
      "5gald should return invalid unit"
    );
  });

  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    convertHandler.isValid("5gal");
    assert.equal(
      convertHandler.getReturnUnit("gal"),
      "l",
      "gal should return l"
    );
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    convertHandler.isValid("5gal");
    assert.equal(
      convertHandler.spellOutUnit("gal"),
      "gallon",
      "gal should return gallons"
    );
  });

  test("convertHandler should correctly convert gal to L.", function () {
    convertHandler.isValid("5gal");
    assert.equal(
      convertHandler.convert(5, "gal"),
      18.92705,
      "5gal should return 18.92705"
    );
  });

  test("convertHandler should correctly convert L to gal.", function () {
    convertHandler.isValid("5l");
    assert.equal(
      convertHandler.convert(5, "l"),
      1.32086,
      "5l should return 1.32086"
    );
  });

  test("convertHandler should correctly convert mi to km.", function () {
    convertHandler.isValid("5mi");
    assert.equal(
      convertHandler.convert(5, "mi"),
      8.0467,
      "5mi should return 8.04670"
    );
  });

  test("convertHandler should correctly convert km to mi.", function () {
    convertHandler.isValid("5km");
    assert.equal(
      convertHandler.convert(5, "km"),
      3.10686,
      "5km should return 3.10686"
    );
  });

  test("convertHandler should correctly convert lbs to kg.", function () {
    convertHandler.isValid("5lbs");
    assert.equal(
      convertHandler.convert(5, "lbs"),
      2.26796,
      "5lbs should return 2.26796"
    );
  });

  test("convertHandler should correctly convert kg to lbs.", function () {
    convertHandler.isValid("5kg");
    assert.equal(
      convertHandler.convert(5, "kg"),
      11.02312,
      "5kg should return 11.02312"
    );
  });
});
