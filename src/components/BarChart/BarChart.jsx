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
          text: "Month", // Set your X-axis label text
          color: "#3e4147", // Set the color of the X-axis label
          font: {
            weight: 700, // Set the desired font weight
            size: 12,
          },
        },
        grid: {
          display: false, // Set to false to hide the X-axis grid lines
        },
      },
      y: {
        position: "top", // Set the Y-axis position to "top"
        title: {
          display: true,
          text: "Value, $", // Set your Y-axis label text
          color: "#3e4147", // Set the color of the Y-axis label
          font: {
            weight: 700, // Set the desired font weight
            size: 12,
          },
        },
        grid: {
          display: false, // Set to false to hide the Y-axis grid lines
        },
      },
    },
    layout: {
      padding: {
        top: 10, // Adjust top padding as needed
        bottom: 0,
      },
    },
    maintainAspectRatio: false, // Set to false to control the height directly
    responsive: true, // Make sure the chart is responsive
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Set the height of the chart directly
  const chartHeight = 400; // Replace with your desired height

  return (
    <div className="barchart">
      <Bar data={chartData} options={options} height={chartHeight} />
    </div>
  );
}

export default BarChart;
