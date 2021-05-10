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

  CalculationHistory.getNumber = async function (id) {
    try {
      const res = await this.findOne({
        include: [{
          model: this.sequelize.models.calculationResult,
          as: 'calculationResults'
        }],
        where: { id },
      });

      if (!res) return { data: null };

      const resData = res.dataValues;
      const calculationResults = resData.calculationResults;
      let data = {
        id: resData.id,
        number: resData.number,
      };

      data = calculationResults.reduce((previous, val) => {
        const data = val.dataValues;

        switch (data.type) {
        case 'ARITHMETIC_MEAN':
          previous.arithmeticMean = parseFloat(data.result);
          break;
        case 'MEDIAN':
          previous.median = parseFloat(data.result);
          break;
        }

        return previous;
      }, { ...data });

      return {
        message: 'Number found in the database',
        data
      };
    } catch (error) {
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

      const data = res.map(val => {
        const resData = val.dataValues;
        const calculationResults = resData.calculationResults;
        let data = {
          id: resData.id,
          number: resData.number,
        };

        data = calculationResults.reduce((previous, val) => {
          const data = val.dataValues;

          switch (data.type) {
          case 'ARITHMETIC_MEAN':
            previous.arithmeticMean = parseFloat(data.result);
            break;
          case 'MEDIAN':
            previous.median = parseFloat(data.result);
            break;
          }

          return previous;
        }, { ...data });

        return data;
      });


      return {
        message: 'Number found in the database',
        data
      };
    } catch (error) {
      return error;
    }
  };

  return CalculationHistory;
};

