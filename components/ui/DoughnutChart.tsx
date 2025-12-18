"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  // Fallback if no accounts yet
  const safeAccounts = Array.isArray(accounts) ? accounts : [];

  // Build dynamic data based on real accounts
  const labels = safeAccounts.map((acc, idx) => acc.name || `Bank ${idx + 1}`);
  const dataValues = safeAccounts.map((acc) => acc.currentBalance || 0);

  // If there are no accounts, show a single empty slice so chart renders nicely
  const chartData = {
    labels: labels.length > 0 ? labels : ["No banks"],
    datasets: [
      {
        label: "Banks",
        data: dataValues.length > 0 ? dataValues : [1],
        backgroundColor: [
          "#0747b6",
          "#2265d8",
          "#2f91fa",
          "#4ca3ff",
          "#7bb8ff",
        ].slice(0, Math.max(dataValues.length, 1)),
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;