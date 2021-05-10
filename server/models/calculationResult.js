'use strict';

const sequelize = require('../db/index');
const { DataTypes } = require('sequelize');

const CalculationResult = sequelize.define('calculationResult', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  result: { type: DataTypes.DECIMAL, allowNull: false }

});

module.exports = CalculationResult;
