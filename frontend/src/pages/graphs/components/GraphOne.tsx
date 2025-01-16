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
import { GraphOneOptions, pairsColors } from "./GraphOneOptions";
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
import { io, Socket } from "socket.io-client";

interface DrinkPairProps {
  prices: PriceHistoryDTO[]
}

export default function GenerateGraphOne(props: DrinkPairProps) {
  const [prices, setPrices] = useState<PriceHistoryDTO[]>([]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:5200");
    socket.on("price-updates", (newPrice: PriceHistoryDTO) => {
      console.log("received data");
      console.log(newPrice);

      setPrices((prevPrices) => {
        const updatedPrices = [...prevPrices, newPrice];
        if (updatedPrices.length > 15) {
          updatedPrices.shift();
        }
        return updatedPrices;
      });
    });
    socket.on("connect", () => {
      console.log("Socket connected successfully:", socket.id);
    });
  
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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

  const datasets = Object.entries(groupedPrices).flatMap(([pairId, pairPrices], index) => {
    const pairLabels = pairPrices.map((price) => price.time);

    const dataset1 = {
      label: pairId,
      data: pairPrices.map((price) => price.price_drink_1),
      borderColor: `hsl(${pairsColors[index]}, 70%, 50%)`,
      labels: pairLabels,
    };

    const dataset2 = {
      label: pairId,
      data: pairPrices.map((price) => price.price_drink_2),
      borderColor: `hsl(${pairsColors[index] + 30}, 70%, 50%)`,
      labels: pairLabels,
    };

    return [dataset1, dataset2];
  });
  const uniqueLabels = Array.from(new Set(prices.map((price) => price.time))).sort();
  const trimmedLabels = uniqueLabels.map(label => {
    const date = new Date(label);
    return date.getHours() + ":" + date.getMinutes();
  });

  const data = {
    labels: trimmedLabels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      data: uniqueLabels.map((label) => {
        const index = dataset.labels.indexOf(label);
        return index !== -1 ? dataset.data[index] : null; // Preserve data alignment with labels
      }),
    })),
  };

  return <Line options={GraphOneOptions} data={data} />;
}
