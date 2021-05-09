'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db/index.js');
const serverRoutes = require('./routers/index.js');

const PORT = process.env.PORT || 3000;

startDB();

async function startDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('Database connected');

    startServer();
  } catch (error) {
    console.error('Database connect error');
    process.exit(-1);
  }
}

function startServer() {
  try {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

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
