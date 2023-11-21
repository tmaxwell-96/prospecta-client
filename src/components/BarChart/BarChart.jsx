import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  console.log(chartData);
  return (
    <div>
      <Bar />
    </div>
  );
}

export default BarChart;
