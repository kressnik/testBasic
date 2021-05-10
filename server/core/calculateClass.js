'use strict';

const { MathematicsClass } = require('../core/mathematicsClass');
const models = require('../models/index');

class CalculationsClass {
  constructor({ number = null, id = null }) {
    this.number = number;
    this.id = id;
    this.history = null;
  }

  get() {

    const data = this.calculateNumber(this.number);
    this.addHistoryToDB(data);

    return {
      status: 'OK',
      data
    };
  }

  async delete() {
    const result = await this.deleteHistoryToDB(this.id);
    return {
      status: 'OK',
      message: result.message
    };
  }

  async getHistory() {
    const data = await this.getHistoryToDB();
    return {
      status: 'OK',
      data
    };
  }

  calculateNumber(number) {
    const calculate = new MathematicsClass({
      lengthArr: number,
      maxValue: 10 ** 5
    });

    calculate.createRandomArr();
    const arithmeticMean = calculate.calArithmeticMean();
    const median = calculate.calMedian();

    return { number, median, arithmeticMean };
  }

  async getHistoryToDB() {
    const res = await models.calculationHistory.getAll();
    return res.data;
  }

  async getNumberToDB(id) {
    const res = await models.calculationHistory.getNumber(id);
    return res.data;
  }

  async deleteHistoryToDB(id) {
    return await models.calculationHistory.delete(id);
  }

  async addHistoryToDB({ number, median = null, arithmeticMean = null }) {
    const resAddedNumber = await this.numberAddHistoryDB(number);
    await this.resultAddHistoryDB(resAddedNumber.id, { median, arithmeticMean });
  }

  async numberAddHistoryDB(number) {
    return await models.calculationHistory.add({
      number
    });
  }

  async resultAddHistoryDB(idHistory, { median = null, arithmeticMean = null }) {
    return await models.calculationResult.add(idHistory, { median, arithmeticMean });
  }
}

exports.CalculationsClass = CalculationsClass;
