// import { Chart } from "chart.js";
import { formatNumberWithCommas, sumValues } from "../../functions/functions";

const GraphicalInfo = ({ dealList }) => {
  const dataPoints = dealList.map((deal) => ({
    x: deal.expected_sale_date,
    y: deal.value,
  }));

  function sumYValuesByMonth(dataArray) {
    // Create an object to store the sum of y-values for each month
    const monthlySum = {};

    // Iterate over the array and accumulate y-values
    dataArray.forEach((data) => {
      const date = new Date(data.x);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      // If the year-month key doesn't exist, create it with the current y-value
      if (!monthlySum[yearMonth]) {
        monthlySum[yearMonth] = data.y;
      } else {
        // If the key already exists, add the current y-value to the existing sum
        monthlySum[yearMonth] += data.y;
      }
    });

    console.log(monthlySum);
  }

  if (dataPoints.length) {
    // console.log(dataPoints);
    sumYValuesByMonth(dataPoints);
  }

  return (
    <section>
      <h2>Graph goes here</h2>
      {`Total Value: $${formatNumberWithCommas(sumValues(dealList))}`}
      <canvas id="myChart"></canvas>
      <canvas id="acquisitions"></canvas>
    </section>
  );
};

export default GraphicalInfo;
