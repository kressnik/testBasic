'use strict';

const { validationResult } = require('express-validator');

const numberHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.status(200).json({
    code: 200,
    data: {
      number: 5,
      median: 10,
      arithmeticMean: 5
    },
    message: 'Calculation data successfully',
    messageCode: 'CALCULATION_DATA_OK',
    time: Date.now()
  });
};

const getHistoryHandler = (req, res) => {
  res.status(200).json({
    code: 200,
    data: [
      {
        number: 5,
        median: 10,
        arithmeticMean: 5
      }
    ],
    message: 'Calculation history received successfully',
    messageCode: 'HISTORY_GET_OK',
    time: Date.now()
  });
};

const deleteCalculateHandler = (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'Removed calculation',
    messageCode: 'DELETE_OK',
    time: Date.now()
  });
};

exports.numberHandler = numberHandler;
exports.getHistoryHandler = getHistoryHandler;
exports.deleteCalculateHandler = deleteCalculateHandler;
