import { useLoaderData } from "react-router-dom";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";
import GenerateGraphTwo from "../components/GraphTwo.tsx";

interface PricesLoaderData {
    prices: PriceHistoryDTO[]
}

export default function GraphTwo() {
    const data = useLoaderData() as PricesLoaderData;
    return (
    <>
        <GenerateGraphTwo prices={data.prices}/>
    </>
    )
}