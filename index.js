'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const serverRoutes = require('./routers/index.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(serverRoutes);
app.use(defaultRoute);
app.listen(PORT, () => {
  console.log(`Server: Start OK. Port ${PORT}`);
});

function defaultRoute(req, res) {
  res.status(404).send({
    status: 'ERORR',
    code: 404,
    time: Date.now(),
    message: `Route doesn't found.  ${req.path}`,
    meassgeCode: 'SYSTEM_ROUTE_NOT_FOUND',
    method: req.method,
  });
};
