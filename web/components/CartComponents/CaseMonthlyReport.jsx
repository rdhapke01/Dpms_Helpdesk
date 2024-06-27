'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/css/CategoryMonthlyReport.module.css'; 

const CategoryMonthlyReport = () => {
  const chartRef = useRef(null);
  let myChart = null; 

  useEffect(() => {
    const chartData = {
      labels: [ "Ground Cs",
      "Utility Con",
      "ENV Regulations",
      "ROW Issues",
      "Weather Cs",
      "M A",
      "Dn Changes",
      "Labor Ss",
      "S H",
      "Co Op"
    ], 
      datasets: [{
        label: 'Open Tickets',
        data: [50, 60, 40, 55, 55, 30, 20, 15, 25, 30], 
        backgroundColor: '#5A6ACF', 
        borderColor: '#5A6ACF',
        borderWidth: 1
      },
      {
        label: 'Closed Tickets',
        data: [40, 55, 45, 50, 20, 65, 40, 20, 10, 50], 
        backgroundColor: '#E6E8EC', 
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
          text: 'Category Monthly Report - Problems Related to Water Pipeline',
          color: "#5a67ba",
          font: {
            weight: "bold", 
          },
          position: "top", 
          padding: 10, 
          align: "start",
        }
      }
    };

    if (chartRef && chartRef.current) {
      if (myChart !== null) {
        myChart.destroy(); 
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
        myChart.destroy(); 
      }
    };
  }, []);

  return (
    <div className={styles.canvasContainer}> {/* Apply CSS class */}
    <canvas ref={chartRef} className={styles.canvas}></canvas> {/* Apply CSS class */}
  </div>
  );
};

export default CategoryMonthlyReport;
