"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "@/css/CaseReportChart.module.css";
import { userSelector } from "@/redux-toolkit/store/store";
import { useSelector } from "react-redux";

const CaseReportChart = () => {
  // const userData = useSelector((state) => state.user.userData);

  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    // console.log(userData);
    const chartData = {
      labels: ["Open Tickets", "Closed Tickets"],
      datasets: [
        {
          label: "Cases",
          data: [300, 200],
          backgroundColor: ["#C7CEFF", "#5A6ACF"],
          borderColor: ["#C7CEFF", "#5A6ACF"],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      plugins: {
        title: {
          display: true,
          text: "Case Report",
          color: "#5a67ba",
          font: {
            weight: "bold",
          },
          position: "top",
          padding: 10,
          align: "start",
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 8, // Reduced width of each legend box
            boxHeight: 8, // Reduced height of each legend box
            padding: 5, 
            usePointStyle: true, // Use point style for legends
            pointStyle: 'circle', // Ensuring circle style is used
           
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 4,
    };

    if (chartRef && chartRef.current) {
      if (myChart !== null) {
        myChart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
      });
    }

    return () => {
      if (myChart !== null) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <div className={styles["canvas-container"]}>
      <canvas ref={chartRef} className={styles.canvas}></canvas>
    </div>
  );
};

export default CaseReportChart;
