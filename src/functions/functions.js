const formatNumberWithCommas = (number) => {
  let numberString = number.toString();
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberString;
};

const sumValues = (array) => {
  const totalSum = array.reduce((accumulator, currentValue) => {
    if (currentValue.hasOwnProperty("value")) {
      return accumulator + currentValue.value;
    } else {
      return accumulator;
    }
  }, 0);
  return totalSum;
};

module.exports = {
  formatNumberWithCommas,
  sumValues,
};
