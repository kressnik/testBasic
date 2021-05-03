const express = require('express');
const { getAll } = require('../controllers/calculate.js');
const router = express.Router();

router.get('/api/calculate', getAll);

module.exports = router;

