'use strict';

const { CalculationsClass } = require('../core/calculateClass');
const { validationResult } = require('express-validator');

const numberHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const calculation = new CalculationsClass({ number: req.body.number });
  const data = calculation.get();

  res.status(200).json({
    code: 200,
    data,
    message: 'Calculation data successfully',
    messageCode: 'CALCULATION_DATA_OK',
    time: Date.now()
  });
};

const getHistoryHandler = (req, res) => {

  const calculation = new CalculationsClass({});
  const data = calculation.getHistory();

  res.status(200).json({
    code: 200,
    data,
    message: 'Calculation history received successfully',
    messageCode: 'HISTORY_GET_OK',
    time: Date.now()
  });
};

const deleteCalculateHandler = async (req, res) => {
  const id = req.params.id;
  const calculation = new CalculationsClass({ id });
  const result = await calculation.delete();

  res.status(200).json({
    code: 200,
    message: result.message,
    messageCode: 'DELETE_OK',
    time: Date.now()
  });
};

exports.numberHandler = numberHandler;
exports.getHistoryHandler = getHistoryHandler;
exports.deleteCalculateHandler = deleteCalculateHandler;
