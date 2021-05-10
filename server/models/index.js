'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');
const basename = path.basename(__filename);
const db = {};

db.init = async function () {
  await sequelize.authenticate();

  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  await sequelize.sync();

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

module.exports = db;
