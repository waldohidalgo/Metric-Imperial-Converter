"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", function (req, res) {
    const input = req.query.input;
    inputResponse(res, input, convertHandler);
  });

  app.post("/api/convert", function (req, res) {
    const input = req.body.input;
    inputResponse(res, input, convertHandler);
  });
};

function inputResponse(res, input, convertHandler) {
  if (input === undefined) {
    res.json({ error: "query string is not valid" });
  } else {
    // la funcion isValid setea el numero y/o la unidad y en función de si existen valores para el numero o unidad se muestra mensajes de error respectivos
    convertHandler.isValid(input);

    const initNum = convertHandler.numero;
    const initUnit = convertHandler.unit;

    if (initNum === null && initUnit !== null) {
      res.json({ error: "invalid number" });
      return;
    }
    if (initNum !== null && initUnit === null) {
      res.json({ error: "invalid unit" });
      return;
    }
    if (initNum === null && initUnit === null) {
      res.json({ error: "invalid number and unit" });
      return;
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      +initNum,
      initUnit,
      +returnNum,
      returnUnit
    );
    res.status(200).json({
      initNum: +initNum,
      initUnit: initUnit === "l" ? "L" : initUnit,
      returnNum,
      returnUnit: returnUnit === "l" ? "L" : returnUnit,
      string,
    });
  }
}
