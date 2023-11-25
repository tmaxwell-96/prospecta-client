import BarChart from "../BarChart/BarChart";
import { formatNumberWithCommas, sumValues } from "../../functions/functions";
import { useState, useEffect } from "react";
import moment from "moment";

const GraphicalInfo = ({ dealList }) => {
  //Graph State

  const dataPoints = dealList.map((deal) => ({
    x: deal.expected_sale_date,
    y: deal.value * (Number(deal.percent_certainty.replace(/%/g, "")) / 100),
  }));

  function sumYValuesByMonth(dataArray) {
    const monthlySum = {};

    dataArray.forEach((data) => {
      const date = moment(data.x).toDate();
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!monthlySum[yearMonth]) {
        monthlySum[yearMonth] = data.y;
      } else {
        monthlySum[yearMonth] += data.y;
      }
    });

    // Convert the object into an array of objects
    const resultArray = Object.entries(monthlySum).map(([month, value]) => ({
      month,
      value,
    }));

    return resultArray;
  }

  const actualData = sumYValuesByMonth(dataPoints).sort((a, b) =>
    a.month > b.month ? 1 : -1
  );

  if (actualData.month) {
  }

  //Graph Testing

  const [graphData, setGraphData] = useState({
    labels: actualData.map((data) =>
      new Date(data.month).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Value Per Month",
        data: actualData.map((data) => data.value),
      },
    ],
  });

  useEffect(() => {
    setGraphData({
      labels: actualData.map((data) => data.month),
      datasets: [
        {
          label: "Value Per Month",
          data: actualData.map((data) => data.value),
          backgroundColor: ["#cc4425"],
          borderColor: ["black"],
          borderWidth: 1,
          borderRadius: 4,
          paddingTop: 10,
        },
      ],
    });
  }, [dealList]);

  return (
    <section>
      {`Total Value: $${formatNumberWithCommas(sumValues(dealList))}`}
      <BarChart chartData={graphData} />
    </section>
  );
};

export default GraphicalInfo;
