'use strict';
const express = require('express');
const { statusServ } = require('../controllers/servers.js');
const router = express.Router();

router.get('/server', statusServ);

module.exports = router;

