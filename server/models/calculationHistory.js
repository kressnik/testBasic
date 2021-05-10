'use strict';
const snakeCaseToCamelCase = function (str) {
  return str.split('_')
    .reduce((res, word, i) => {
      if (!i) return word.toLowerCase();
      return `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`;
    }, '');
};

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
      const { dataValues } = await this.create(data);

      return dataValues;
    } catch (error) {
      return error;
    }
  };

  CalculationHistory.delete = async function (id) {
    try {
      const res = await this.findByPk(id);

      if (!res) throw { message: 'No item found in the database' };

      await res.destroy();
      return { message: 'Item removed from the database' };
    } catch (error) {
      error.isError = true;
      return error;
    }
  };

  CalculationHistory.getNumber = async function (id) {
    try {
      const { dataValues } = await this.findOne({
        include: [{
          model: this.sequelize.models.calculationResult,
          as: 'calculationResults'
        }],
        where: { id },
      });

      if (!dataValues) return { data: null };

      const calculationResults = dataValues.calculationResults;
      const data = {
        id: dataValues.id,
        number: dataValues.number,
      };

      return calculationResults.reduce((previous, val) => {
        const { dataValues } = val;
        const type = snakeCaseToCamelCase(dataValues.type);

        previous[type] = parseFloat(dataValues.result);
        return previous;
      }, { ...data });

    } catch (error) {
      error.isError = true;
      return error;
    }
  };

  CalculationHistory.getAll = async function () {
    try {
      const res = await this.findAll({
        include: [{
          model: this.sequelize.models.calculationResult,
          as: 'calculationResults',
          order: [['id', 'DESC']],
        }]
      });

      if (!res) return { data: null };

      return res.map(val => {
        const { dataValues } = val;
        const calculationResults = dataValues.calculationResults;
        let data = {
          id: dataValues.id,
          number: dataValues.number,
        };

        data = calculationResults.reduce((previous, val) => {
          const { dataValues } = val;
          const type = snakeCaseToCamelCase(dataValues.type);

          previous[type] = parseFloat(dataValues.result);
          return previous;
        }, { ...data });

        return data;
      });
    } catch (error) {
      error.isError = true;
      return error;
    }
  };

  return CalculationHistory;
};

