import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.scss";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          color: "#3e4147",
          font: {
            weight: 700,
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        position: "top",
        title: {
          display: true,
          text: "Value, $",
          color: "#3e4147",
          font: {
            weight: 700,
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Set the height of the chart directly
  const chartHeight = 400;

  return (
    <div className="barchart">
      <Bar data={chartData} options={options} height={chartHeight} />
    </div>
  );
}

export default BarChart;
