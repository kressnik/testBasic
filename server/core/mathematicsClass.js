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

  multiplicationArr() {
    return this.dataArr.map((val, index) => this.multiplicationNumbers(index));
  }

  multiplicationNumbers(numberElement) {
    const notUseElement = numberElement || -1;

    const data = this.dataArr.reduce((prev, val, index) => {
      if (notUseElement === index) return prev;
      if (!prev) return prev + parseFloat(val);

      return prev * val;
    }, 0);

    return data;
  }

  removeMaxVal() {
    this.dataArr = this.dataArr.filter(val => val >= 0 && val <= this.maxValue);
    return this.dataArr;
  }
}

exports.MathematicsClass = MathematicsClass;
