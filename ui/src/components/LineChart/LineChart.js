// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register the necessary components with ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);
const portfolioNumbers = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const percentileLosses = [5000000, 7550000, 6500000, 8000000, 9000000, 5000000, 4000000, 2000000, 0, 0];
const LineChart = () => {
  // Data for the chart
  const data = {
    labels: portfolioNumbers,
    datasets: [
      {
        label: '99.5th Percentile Loss',
                    data: percentileLosses, // Y-axis data (percentile loss values)
                    borderColor: 'rgba(75, 192, 192, 1)', // Line color
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area under the line
                    fill: true,
                    borderWidth: 2
      }
    ],
    options: {
        responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Portfolio Number',
                            color: '#fff'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '99.5th Percentile Loss',
                            color: '#fff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                       
                    }
                }
    }
  };

  // Options for the chart
  const options = {
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
