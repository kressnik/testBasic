'use strict';

const { MathematicsClass } = require('../core/mathematicsClass');


class CalculationsClass {
  constructor({ number = null, id = null }) {
    this.number = number;
    this.id = id;
  }

  get() {
    const calculate  = new MathematicsClass({
      lengthArr: this.number,
      maxValue: 10 ** 5
    });

    calculate.createRandomArr();
    const arithmeticMean = calculate.calArithmeticMean();
    const median = calculate.calMedian();

    return {
      status: 'OK',
      data: {
        number: this.number,
        median,
        arithmeticMean
      }
    };
  }

  delete() {
    return {
      status: 'OK'
    };
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
}

exports.CalculationsClass = CalculationsClass;
