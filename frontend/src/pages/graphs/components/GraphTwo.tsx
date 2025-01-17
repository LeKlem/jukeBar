import { useEffect, useState } from "react";
import { PriceHistoryDTO } from "../../../models/Price-history";
import { io, Socket } from "socket.io-client";

interface DrinkPairProps {
  prices: PriceHistoryDTO[]
}

export default function GenerateGraphTwo(props: DrinkPairProps) {
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


  return (
    <div>
        Test
    </div>
    );
}
