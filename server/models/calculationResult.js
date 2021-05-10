'use strict';

module.exports = (sequelize, DataTypes) => {
  const CalculationResult = sequelize.define('calculationResult', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    result: { type: DataTypes.DECIMAL, allowNull: false }

  });

  return CalculationResult;
};

