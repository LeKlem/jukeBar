import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'; // Updated import

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
        position: 'top' as const,
      },
    tooltip: {
      callbacks: {
        label: (context) => `Value: ${context.raw}`, // Show only the value
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          size: 12, // Adjust tick font size
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.2)', // Light horizontal gridlines
      },
      ticks: {
        font: {
          size: 12,
        },
        callback: (value) => `€${value}`, // Add dollar sign to y-axis values
      },
      beginAtZero: false,
    },
  },
  elements: {
    line: {
      borderWidth: 2, // Thinner line for stock market style
      tension: 0.3, // Smooth the lines
    },
    point: {
      radius: 0, // Hide points for a cleaner look
      hoverRadius: 6, // Highlight points on hover
    },
  },
  animation: {
    duration: 800, // Smooth transition for updates
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Stock A',
      data: labels.map(() => faker.number.int({ min: 200, max: 1000 })), // Stock prices
      borderColor: 'rgb(53, 162, 235)', // Blue line
      backgroundColor: 'rgba(53, 162, 235, 0.1)', // Light fill for area under the line
      fill: true, // Enable area fill
    },
    {
      label: 'Stock B',
      data: labels.map(() => faker.number.int({ min: 200, max: 1000 })), // Stock prices
      borderColor: 'rgb(255, 99, 132)', // Red line
      backgroundColor: 'rgba(255, 99, 132, 0.1)', // Light fill for area under the line
      fill: true, // Enable area fill
    },
  ],
};

export default function Graph() {
  return <Line options={options} data={data} />;
}
