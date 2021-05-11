'use strict';

const { CalculationsClass } = require('../core/calculateClass');
const { validationResult } = require('express-validator');

const numberHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { number } = req.body;
  const calculation = new CalculationsClass({ number });

  try {
    const data = calculation.get();

    res.status(200).json({
      code: 200,
      data,
      message: 'Calculation data successfully',
      messageCode: 'CALCULATION_DATA_OK',
      time: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      messageCode: 'CALCULATION_DATA_ERROR',
      time: Date.now()
    });
  }
};

const arrHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const dataArr = req.body.arr;
    const calculation = new CalculationsClass({ dataArr });
    const data = calculation.calculateArr();

    res.status(200).json({
      code: 200,
      data,
      message: 'Calculation array successfully',
      messageCode: 'CALCULATION_ARRAY_OK',
      time: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      messageCode: 'CALCULATION_ARRAY_ERROR',
      time: Date.now()
    });
  }
};

const getHistoryHandler = async (req, res) => {

  const calculation = new CalculationsClass({});

  try {
    const data = await calculation.getHistory();

    res.status(200).json({
      code: 200,
      data,
      message: 'Calculation history received successfully',
      messageCode: 'HISTORY_GET_OK',
      time: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      messageCode: 'HISTORY_GET_ERROR',
      time: Date.now()
    });
  }

};

const deleteCalculateHandler = async (req, res) => {
  const { id } = req.params;
  const calculation = new CalculationsClass({ id });

  try {
    const { message } = await calculation.delete();

    res.status(200).json({
      code: 200,
      message,
      messageCode: 'DELETE_OK',
      time: Date.now()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: error.message,
      messageCode: 'DELETE_ERROR',
      time: Date.now()
    });
  }
};

exports.numberHandler = numberHandler;
exports.getHistoryHandler = getHistoryHandler;
exports.deleteCalculateHandler = deleteCalculateHandler;
exports.arrHandler = arrHandler;
