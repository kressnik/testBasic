'use strict';

const { MathematicsClass } = require('../core/mathematicsClass');
const models = require('../models/index');

class CalculationsClass {
  constructor({ number = null, id = null, dataArr = null }) {
    this.number = number;
    this.id = id;
    this.dataArr = dataArr;
    this.history = null;
  }

  get() {
    const data = this.calculateNumber(this.number);
    this.addHistoryToDB(data);

    return data;
  }

  async delete() {
    const result = await this.deleteHistoryToDB(this.id);
    return {
      status: 'OK',
      message: result.message
    };
  }

  async getHistory() {
    return await this.getHistoryToDB();
  }

  calculateNumber(lengthArr) {
    const calculate = new MathematicsClass({
      lengthArr,
      maxValue: 10 ** 5
    });

    const newArr = calculate.createRandomArr();
    calculate.updateDataArr(newArr);
    const data = calculate.claAll();

    return { lengthArr, ...data };
  }

  calculateArr() {
    const calculate = new MathematicsClass({
      maxValue: 10 ** 3,
      dataArr: this.dataArr
    });

    calculate.removeMaxVal();
    return calculate.multiplicationArr();
  }

  async getHistoryToDB() {
    try {
      const res = await models.calculationHistory.getAll();
      return res;
    } catch (error) {
      throw { message: 'An error occurred while receiving all data' };
    }
  }

  async getNumberToDB(id) {
    try {
      const res = await models.calculationHistory.getNumber(id);
      return res;
    } catch (error) {
      throw { message: 'An error occurred while receiving data' };
    }
  }

  async deleteHistoryToDB(id) {
    try {
      const res = await models.calculationHistory.delete(id);
      return res;
    } catch (error) {
      throw error.message;
    }
  }

  async addHistoryToDB({ number, median = null, arithmeticMean = null }) {
    try {
      const { id } = await this.numberAddHistoryDB(number);
      await this.resultAddHistoryDB({ id, median, arithmeticMean });
    } catch (error) {
      throw error.message;
    }
  }

  async numberAddHistoryDB(number) {
    return await models.calculationHistory.add({
      number
    });
  }

  async resultAddHistoryDB({ idHistory = null, median = null, arithmeticMean = null }) {
    return await models.calculationResult.add({ idHistory, median, arithmeticMean });
  }
}

exports.CalculationsClass = CalculationsClass;
