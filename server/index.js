'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

startDB();

async function startDB() {
  try {
    const db = require('./models/index');
    await db.init();

    console.log('Database started');

    startServer();
  } catch (error) {
    console.error('Database started error');
    process.exit(-1);
  }
}

function startServer() {
  try {
    const serverRoutes = require('./routers/index.js');
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
    process.exit(-1);
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
