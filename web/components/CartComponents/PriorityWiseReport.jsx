'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/css/PriorityWiseReport.module.css';

const PriorityWiseReport = () => {
  const chartRef = useRef(null);
  let myChart = null; // Variable to hold the Chart instance

  useEffect(() => {
    const chartData = {
      labels: ["Critical", "High", "Medium", "Low", "Routine","High","VeryHigh","Low"], // Priorities
      datasets: [{
        label: 'Open Tickets',
        data: [15, 30, 50, 25, 10,50,10,30], // Sample values for open tickets
        backgroundColor: '#5A6ACF', // Red color for created tickets
        borderColor: '#5A6ACF',
        borderWidth: 1
      },
      {
        label: 'Closed Tickets',
        data: [10, 20, 40, 15, 5,50,10,20], // Sample values for closed tickets
        backgroundColor: '#E6E8EC', // Blue color for closed tickets
        borderColor: '#E6E8EC',
        borderWidth: 1
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Priority Wise Report - Open vs Closed Tickets',
          color: "#5a67ba",
          font: {
            weight: "bold", // Make title bold
          },
          position: "top", // Place title at the top
          padding: 10,
          align: "start", // Add padding to the title
        }
      }
    };

    if (chartRef && chartRef.current) {
      if (myChart !== null) {
        myChart.destroy(); // Destroy previous chart instance
      }
      
      const ctx = chartRef.current.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }

    return () => {
      if (myChart !== null) {
        myChart.destroy(); // Cleanup function to destroy the chart instance when component unmounts
      }
    };
  }, []);

  return (
   
     <div className={styles.canvasContainer}> {/* Apply CSS class */}
      <canvas ref={chartRef} className={styles.canvas}/>
    </div>
  );
};

export default PriorityWiseReport;
