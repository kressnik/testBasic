'use strict';

module.exports = (sequelize, DataTypes) => {
  const CalculationResult = sequelize.define('calculationResult', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    result: { type: DataTypes.DECIMAL, allowNull: false }
  });

  CalculationResult.add = async function (idHistory, { median = null, arithmeticMean = null }) {
    try {
      const data = [];

      !median ? '' : data.push({
        calculationResultId: idHistory,
        type: 'MEDIAN',
        result: median
      });

      !arithmeticMean ? '' : data.push({
        calculationResultId: idHistory,
        type: 'ARITHMETIC_MEAN',
        result: arithmeticMean
      });

      const result = await this.bulkCreate(data);

      return result.map(val => val.dataValues);
    } catch (error) {
      return error;
    }

  };

  return CalculationResult;
};

