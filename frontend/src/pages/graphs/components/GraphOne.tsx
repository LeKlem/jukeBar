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
  prices: PriceHistoryDTO[];
  drinksName: {
    pairId: number;
    drinkOneName: string;
    drinkTwoName: string;
  }[];
}
type DrinksName = {
  pairId: number;
  drinkOneName: string;
  drinkTwoName: string;
};

export default function GenerateGraphOne(props: DrinkPairProps) {
  const [prices, setPrices] = useState<PriceHistoryDTO[]>([]);
  const [drinksName, setDrinksNames] = useState<DrinksName[]>([]);
  useEffect(() => {
    const socket: Socket = io("http://localhost:5200");
    socket.on("price-updates", (newPrice: PriceHistoryDTO) => {
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
    setDrinksNames(props.drinksName || []);

  }, [props.prices, props.drinksName]);
  const groupedPrices = prices.reduce((acc, price) => {
    const { pairId } = price;
    if (!acc[pairId]) {
      acc[pairId] = [];
    }
    acc[pairId].push(price);
    return acc;
  }, {} as Record<number, PriceHistoryDTO[]>);

  //get two arrays containing drinks name before going into next function
  const datasets = Object.entries(groupedPrices).flatMap(([pairId, pairPrices], index) => {
    const pairLabels = pairPrices.map((price) => price.time);
    const drinkPair = drinksName.find(drink => drink.pairId == Number(pairId));

    const dataset1 = {
      label: drinkPair?.drinkOneName || `Drink 1 - Pair ${pairId}`,
      data: pairPrices.map((price) => price.price_drink_1),
      borderColor: `hsl(${pairsColors[index]}, 70%, 50%)`,
      labels: pairLabels,
    };
    
    const dataset2 = {
      label: drinkPair?.drinkTwoName || `Drink 2 - Pair ${pairId}`,
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
        return index !== -1 ? dataset.data[index] : null;
      }),
    })),
  };

  return <Line options={GraphOneOptions} data={data} />;
}
