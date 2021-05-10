'use strict';

const { MathematicsClass } = require('../core/mathematicsClass');
const models = require('../models/index');

class CalculationsClass {
  constructor({ number = null, id = null }) {
    this.number = number;
    this.id = id;
  }

  get() {
    const calculate = new MathematicsClass({
      lengthArr: this.number,
      maxValue: 10 ** 5
    });

    calculate.createRandomArr();
    const arithmeticMean = calculate.calArithmeticMean();
    const median = calculate.calMedian();
    const data = {
      number: this.number,
      median,
      arithmeticMean
    };

    this.addHistoryToDB(data);

    return {
      status: 'OK',
      data
    };
  }

  async delete() {
    return await this.deleteHistoryToDB(this.id);
  }

  getHistory() {
    return [
      {
        number: 5,
        median: 10,
        arithmeticMean: 5
      }
    ];
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
