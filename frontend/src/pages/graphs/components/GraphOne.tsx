import { useEffect, useState } from "react";
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
import { PriceHistoryDTO } from "../../../models/Price-history";
  
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
          label: (context: { raw: any; }) => `Value: ${context.raw}`, // Show only the value
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
          callback: (value: any) => `€${value}`, // Add dollar sign to y-axis values
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
      duration: 800,
    },
  };
  

interface DrinkPairProps {
    prices: PriceHistoryDTO[]
}

export default function GenerateGraphOne(props: DrinkPairProps) {
  const [prices, setPrices] = useState<PriceHistoryDTO[]>([]);

  useEffect(() => {
    setPrices(props.prices || []);
  }, [props.prices]);

  const groupedPrices = prices.reduce((acc, price) => {
    const { pairId } = price;
    if (!acc[pairId]) {
      acc[pairId] = [];
    }
    acc[pairId].push(price);
    return acc;
  }, {} as Record<number, PriceHistoryDTO[]>);

  // Generate datasets dynamically
  const datasets = Object.entries(groupedPrices).map(([pairId, pairPrices]) => {
    // Extract time and prices for this pair
    const pairLabels = pairPrices.map((price) => price.time);
    const pairData = pairPrices.map((price) => price.price_drink_1); // Or price_drink_2, depending on the dataset

    return {
      label: `Pair ${pairId}`,
      data: pairData, // Data for this pair
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color
      backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.1)`, // Random background color
      fill: true,
      labels: pairLabels, // Custom labels for this dataset
    };
  });

  // Merge all unique labels (for x-axis)
  const uniqueLabels = Array.from(new Set(prices.map((price) => price.time))).sort();

  const data = {
    labels: uniqueLabels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      data: uniqueLabels.map((label) => {
        const index = dataset.labels.indexOf(label);
        return index !== -1 ? dataset.data[index] : null; // Preserve data alignment with labels
      }),
    })),
  };

  return <Line options={options} data={data} />;
}
