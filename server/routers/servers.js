'use strict';
const express = require('express');
const { getAll } = require('../controllers/servers.js');
const router = express.Router();

router.get('/api/server', getAll);

module.exports = router;

