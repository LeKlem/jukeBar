import { useEffect, useState } from "react";
import { PriceHistoryDTO } from "../../../models/Price-history";
import { io, Socket } from "socket.io-client";

interface DrinkPairProps {
  prices: PriceHistoryDTO[];
  drink:{
    pairId: number;
    drinkOneName: string;
    drinkTwoName: string;
    drinkOneInc : number;
    drinkOneDec : number;
    drinkTwoInc : number;
    drinkTwoDec : number;
  }
}
type Drink = {
  pairId: number;
  drinkOneName: string;
  drinkTwoName: string;
  drinkOneInc : number;
  drinkOneDec : number;
  drinkTwoInc : number;
  drinkTwoDec : number;
};

export default function GenerateGraphTwo(props: DrinkPairProps) {
  const [prices, setPrices] = useState<PriceHistoryDTO[]>([]);
  const [priceChanges, setPriceChanges] = useState<Record<number, { drink1: string; drink2: string }>>({});

  useEffect(() => {
    const socket: Socket = io("http://localhost:5200");

    socket.on("price-updates", (newPrice: PriceHistoryDTO) => {
      console.log("received data", newPrice);

      setPrices((prevPrices) => {
        const updatedPrices = prevPrices.map((price) => {
          if (price.pairId === newPrice.pairId) {
            const drink1Change = newPrice.price_drink_1 > price.price_drink_1 ? "up" : newPrice.price_drink_1 < price.price_drink_1 ? "down" : "";
            const drink2Change = newPrice.price_drink_2 > price.price_drink_2 ? "up" : newPrice.price_drink_2 < price.price_drink_2 ? "down" : "";
            setPriceChanges((prevChanges) => ({
              ...prevChanges,
              [price.pairId]: { drink1: drink1Change, drink2: drink2Change },
            }));

            return {
              ...price,
              price_drink_1: Math.round(newPrice.price_drink_1 * 100) / 100,
              price_drink_2: Math.round(newPrice.price_drink_2 * 100) / 100,
              time: newPrice.time,
            };
          }
          return price;
        });

        return updatedPrices;
      });

      setTimeout(() => {
        setPriceChanges((prevChanges) => ({
          ...prevChanges,
          [newPrice.pairId]: { drink1: "", drink2: "" },
        }));
      }, 500);
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
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th colSpan={2} style={styles.header}>Paires de boissons</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => {
            const changes = priceChanges[price.pairId] || { drink1: "", drink2: "" };
            return (
              <tr key={price.id}>
                <td style={styles.cell}>
                  <div className={`price ${changes.drink1}`}>{price.price_drink_1}€</div>
                </td>
                <td style={styles.cell}>
                  <div className={`price ${changes.drink2}`}>{price.price_drink_2}€</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  table: {
    width: "80%",
    borderCollapse: "collapse",
    backgroundColor: "rgb(52, 58, 64)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "white",
  },
  header: {
    padding: "16px",
    backgroundColor: "#343a40",
    color: "#ffffff",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    border: "1px solid #dee2e6",
  },
  cell: {
    padding: "12px",
    textAlign: "center",
    fontSize: "16px",
    border: "1px solid #dee2e6",
  },
};
