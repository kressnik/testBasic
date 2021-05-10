'use strict';

const sequelize = require('../db/index');
const { DataTypes } = require('sequelize');

const CalculationHistory = sequelize.define('calculationHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = CalculationHistory;
