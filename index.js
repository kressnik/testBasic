'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db/index.js');
const serverRoutes = require('./routers/index.js');

const PORT = process.env.PORT || 3000;

async function start() {
  try {

    await sequelize.authenticate();
    await sequelize.sync();

    const app = express();

    app.use(express.static(path.resolve(__dirname, 'static')));
    app.use(serverRoutes);
    app.use(defaultRoute);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

start();

function defaultRoute(req, res) {
  res.status(404).send({
    status: 'ERORR',
    code: 404,
    time: Date.now(),
    message: `Route doesn't found.  ${req.path}`,
    meassgeCode: 'SYSTEM_ROUTE_NOT_FOUND',
    method: req.method,
  });
}
