'use strict';
const express = require('express');
const { body } = require('express-validator');
const { numberHandler, getHistoryHandler, deleteCalculateHandler } = require('../controllers/calculate.js');
const router = express.Router();

router.post(
  '/api/calculate',
  body('number').trim().isNumeric().toInt(),
  numberHandler
);

router.get(
  '/api/calculationHistory',
  getHistoryHandler
);

router.delete(
  '/api/calculate/:id',
  deleteCalculateHandler
);

module.exports = router;

