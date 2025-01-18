import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { io, Socket } from "socket.io-client";
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
} from "chart.js";
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
  const [labels, setLabels] = useState<string[]>([]);
  const [drinksName, setDrinksNames] = useState<DrinksName[]>([]);
  const [existingLabels, setExistingLabels] = useState<string[]>([]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:5200");

    socket.on("price-updates", (newPrice: PriceHistoryDTO) => {
      setPrices((prevPrices) => {
        console.log(newPrice)
        const updatedPrices = [...prevPrices, newPrice];
        //replace with code to remove first data after a certain quantity
        // if (updatedPrices.length > 100) {
        //   updatedPrices.shift();
        // }
        
        return updatedPrices;
      });
      setLabels((prevLabels) => {
        const newDate = new Date(newPrice.time);
        var minutes = String(newDate.getMinutes());
        if(Number(minutes) < 10){
          minutes = "0" + newDate.getMinutes();
        }
        const newLabel =  `${newDate.getHours()}:${minutes}`;
    
        if(existingLabels.indexOf(String(newDate)) === -1){
          const updatedLabel = [...prevLabels, newLabel];
          existingLabels.push(String(newDate));
          // if (updatedLabel.length > 100) {
          //   updatedLabel.shift();
          // }
          return updatedLabel;
        }
        return prevLabels;

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

    console.log(props.prices.length);
    const groupedLabels = (props.prices || []).filter(function(price){
      if(existingLabels.indexOf(String(price.time)) === -1){
        existingLabels.push(String(price.time));
        return true;
      }
      return false;
    });
    console.log(groupedLabels.length);

    const initialLabels = (groupedLabels).map((price) => {
      const date = new Date(price.time);
      var minutes = String(date.getMinutes());
      if(Number(minutes) < 10){
        minutes = "0" + date.getMinutes();
      }
      return `${date.getHours()}:${minutes}`;
    });

    setLabels(initialLabels);
  }, [props.prices, props.drinksName]);

  const groupedPrices = prices.reduce((acc, price) => {
    const { pairId } = price;
    if (!acc[pairId]) {
      acc[pairId] = [];
    }
    acc[pairId].push(price);
    return acc;
  }, {} as Record<number, PriceHistoryDTO[]>);

  const datasets = Object.entries(groupedPrices).flatMap(([pairId, pairPrices], index) => {
    const drinkPair = drinksName.find((drink) => drink.pairId == Number(pairId));

    const dataset1 = {
      label: drinkPair?.drinkOneName || `Drink 1 - Pair ${pairId}`,
      data: pairPrices.map((price) => price.price_drink_1),
      borderColor: `hsl(${pairsColors[index]}, 70%, 50%)`,
    };

    const dataset2 = {
      label: drinkPair?.drinkTwoName || `Drink 2 - Pair ${pairId}`,
      data: pairPrices.map((price) => price.price_drink_2),
      borderColor: `hsl(${pairsColors[index] + 30}, 70%, 50%)`,
    };
    return [dataset1, dataset2];
  });
  const data = {
    labels,
    datasets,
  };

  return <Line options={GraphOneOptions} data={data} />;
}
