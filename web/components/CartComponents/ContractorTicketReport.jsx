'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ContractorTicketReport = () => {
  const chartRef = useRef(null);
  let myChart = null; // Variable to hold the Chart instance

  useEffect(() => {
    const chartData = {
      labels: ["Contractor A", "Contractor B", "Contractor C", "Contractor D", "Contractor E"], // Contractor names
      datasets: [{
        label: 'Open Tickets',
        data: [50, 60, 70, 55, 65], // Sample values for tickets created
        backgroundColor: '#5A6ACF', // Red color for created tickets
        borderColor: '#5A6ACF',
        borderWidth: 1
      },
      {
        label: 'Closed Tickets',
        data: [40, 55, 65, 50, 60], // Sample values for tickets closed
        backgroundColor: '#C7CEFF', // Blue color for closed tickets
        borderColor: '#C7CEFF',
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
          text: 'Contractor Monthly Report - Tickets Created vs Tickets Closed'
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
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ContractorTicketReport;

