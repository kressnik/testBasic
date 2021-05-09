'use strict';
const express = require('express');
const { body } = require('express-validator');
const { numberHandler } = require('../controllers/calculate.js');
const router = express.Router();

router.post(
  '/api/calculate',
  body('number').trim().isNumeric().toInt(),
  numberHandler
);

module.exports = router;

