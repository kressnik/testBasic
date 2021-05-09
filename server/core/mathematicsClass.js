'use strict';

class MathematicsClass {
  constructor({ lengthArr = 0, maxValue = 0, dataArr = [] }) {
    this.maxValue = maxValue;
    this.lengthArr = lengthArr;
    this.dataArr = dataArr;
  }

  createRandomArr() {
    this.dataArr = Array.from(
      { length: this.lengthArr },
      () => Math.floor(Math.random() * this.maxValue)
    );
    return this.dataArr;
  }

  calArithmeticMean() {
    const sum = this.dataArr.reduce((a, b) => (a + b));
    const arithmeticMean = sum / this.dataArr.length;

    return arithmeticMean;
  }

  calMedian() {
    const arr = this.sortUp(this.dataArr);
    const middle = arr.length / 2;
    let median = 0;

    if (middle % 1 === 0) {
      median = (arr[middle - 1] + arr[middle]) / 2;
    } else {
      median = arr[Math.floor(middle)];
    }

    return median;
  }

  sortUp(arr) {
    const newArr = JSON.parse(JSON.stringify(arr));

    newArr.sort((a, b) => a - b);

    return newArr;
  }
}

exports.MathematicsClass = MathematicsClass;
