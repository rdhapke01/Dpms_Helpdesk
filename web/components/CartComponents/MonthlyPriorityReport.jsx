"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "@/css/MonthlyPriorityWiseReport.module.css";
import { useSelector } from "react-redux";

const MonthlyPriorityWiseReport = () => {
  const chartRef = useRef(null);
  let myChart = null; // Variable to hold the Chart instance
  const userInfo = useSelector((state) => state.user.userData);
  useEffect(() => {



    const chartData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ], // Months
      datasets: [
        {
          label: "Critical",
          data: [5, 7, 8, 6, 4, 3, 5, 6, 7, 8, 6, 5], // Sample values for Critical priority

          backgroundColor: "#6F7EDE", // Yellow color for Medium priority
          borderColor: "#6F7EDE",
          borderWidth: 1,
        },
        {
          label: "High",
          data: [10, 12, 15, 14, 11, 10, 12, 13, 14, 16, 15, 12], // Sample values for High priority
          backgroundColor: "#E6E8EC", // Red color for created tickets
          borderColor: "#9EA8E2",
          borderWidth: 1,
        },
        {
          label: "Medium",
          data: [20, 25, 30, 28, 22, 20, 24, 26, 28, 32, 30, 25], // Sample values for Medium priority
          backgroundColor: "#DEE1F4", // Yellow color for Medium priority
          borderColor: "#DEE1F4",
          borderWidth: 1,
        },
        {
          label: "Low",
          data: [30, 35, 40, 38, 32, 30, 35, 37, 40, 42, 40, 35], // Sample values for Low priority
          backgroundColor: "#C7CEFF", // Blue color for closed tickets
          borderColor: "#C7CEFF",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Monthly Priority Wise Report - Tickets by Priority",

          color: "#5a67ba",
          font: {
            weight: "bold", // Make title bold
          },
          position: "top", // Place title at the top
          padding: 10, // Add padding to the title
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
        myChart.destroy(); // Destroy previous chart instance
      }

      const ctx = chartRef.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: chartOptions,
      });
    }

    return () => {
      if (myChart !== null) {
        myChart.destroy(); // Cleanup function to destroy the chart instance when component unmounts
      }
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      {" "}
      {/* Apply CSS class */}
      <canvas ref={chartRef} className={styles.canvas}></canvas>{" "}
      {/* Apply CSS class */}
    </div>
  );
};

export default MonthlyPriorityWiseReport;
