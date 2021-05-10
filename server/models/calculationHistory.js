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

  CalculationHistory.delete = async function (id) {
    try {
      const res = await this.findByPk(id);

      if (!res) {
        return {
          message: 'No item found in the database'
        };
      } else {
        await res.destroy();
        return {
          message: 'Item removed from the database'
        };
      }
    } catch (error) {
      return error;
    }
  };

  return CalculationHistory;
};

