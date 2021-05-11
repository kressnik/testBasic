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
    const { dataValues } = await this.create(data);

    return dataValues;
  };

  CalculationHistory.delete = async function (id) {
    const res = await this.findByPk(id);

    if (!res) throw new Error('No item found in the database');

    await res.destroy();
    return { message: 'Item removed from the database' };
  };

  CalculationHistory.getNumber = async function (id) {
    const { dataValues } = await this.findOne({
      include: [{
        model: this.sequelize.models.calculationResult,
        as: 'calculationResults'
      }],
      where: { id },
    });

    if (!dataValues) return null;

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
  };

  CalculationHistory.getAll = async function () {
    const res = await this.findAll({
      include: [{
        model: this.sequelize.models.calculationResult,
        as: 'calculationResults',
        order: [['id', 'DESC']],
      }]
    });

    if (!res) return null;

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
  };

  return CalculationHistory;
};

