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

  CalculationHistory.add = async function (data) {
    try {
      const result = await this.create(data);

      return result.dataValues;
    } catch (error) {
      return error;
    }

  };

  return CalculationHistory;
};

