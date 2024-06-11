function ConvertHandler() {
  this.isValid = function (inputValue) {
    this.numero = null;
    this.unit = null;

    const input = inputValue.toLowerCase();
    const index = input.search(/[a-z]/);

    const value = input.slice(0, index); // contiene numeros
    const unit = input.slice(index); // contiene unidades
    if (["gal", "l", "lbs", "kg", "mi", "km"].includes(unit)) {
      this.unit = unit;
    }
    // chequear si el value es un numero entero o numero decimal
    if (/^(\d*(\.[0-9\s]*)?)$/g.test(value)) {
      this.numero = value.length > 0 ? value : 1;
      return;
    }

    // chequear si el numero es fraccion
    if (/^(\d*(\.[0-9\s]*)?)\/(\d+(\.[0-9\s]*)?)+$/g.test(value)) {
      const numerator = +value.split("/")[0];
      const denominator = +value.split("/")[1];

      if (numerator === 0 && denominator === 0) {
        return;
      }
      if (denominator === 0) {
        return;
      }
      this.numero = (numerator / denominator).toFixed(5);
    }
  };
  this.getNum = function (input) {
    let result;
    result = this.numero === null ? "invalid number" : this.numero;
    return result;
  };

  this.getUnit = function (input) {
    let result;
    result = this.unit === null ? "invalid unit" : this.unit;
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const changeUnits = {
      gal: "l",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    let result;
    result = changeUnits[initUnit];

    return result;
  };

  this.spellOutUnit = function (unit) {
    const namesUnits = {
      gal: "gallon",
      l: "liter",
      lbs: "pound",
      kg: "kilogram",
      mi: "mile",
      km: "kilometer",
    };
    let result;
    result = namesUnits[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    // creacion de factor que convierte de galones a litros, libras a kilos y millas a kilos y viceversa

    const numeroFactorConversion = {
      gal: 3.78541,
      lbs: 0.453592,
      mi: 1.60934,
      l: 1 / 3.78541,
      kg: 1 / 0.453592,
      km: 1 / 1.60934,
    };
    let result;

    result = initNum * numeroFactorConversion[initUnit];

    return +result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const unitInitSpellOut =
      initNum > 1
        ? this.spellOutUnit(initUnit) + "s"
        : this.spellOutUnit(initUnit);
    const unitReturnSpellOut =
      returnNum > 1
        ? this.spellOutUnit(returnUnit) + "s"
        : this.spellOutUnit(returnUnit);
    let result;

    result = `${initNum} ${unitInitSpellOut} converts to ${returnNum} ${unitReturnSpellOut}`;

    return result;
  };
}

module.exports = ConvertHandler;
