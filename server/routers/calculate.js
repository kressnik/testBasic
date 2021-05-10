'use strict';
const express = require('express');
const { body, param } = require('express-validator');
const { numberHandler, getHistoryHandler, deleteCalculateHandler, arrHandler } = require('../controllers/calculate.js');
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
  param('id').trim().isNumeric().toInt(),
  deleteCalculateHandler
);

router.post(
  '/api/calculateArr',
  body('arr').isArray(),
  arrHandler
);

module.exports = router;

