'use strict';

module.exports = (sequelize, DataTypes) => {
  const CalculationHistory = sequelize.define('calculationHistory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER, allowNull: false }
  });

  CalculationHistory.associate = function (models) {
    this.hasMany(models.calculationResult, {
      as: 'calculationResults',
      foreignKey: 'calculationResultId',
      onDelete: 'cascade'
    });
  };

  return CalculationHistory;
};

