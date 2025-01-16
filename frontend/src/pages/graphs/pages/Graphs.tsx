import { useLoaderData } from "react-router-dom";

import GenerateGraphOne from "../components/GraphOne.tsx";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";

interface PricesLoaderData {
    prices: PriceHistoryDTO[]
}

export default function Graph() {
    const data = useLoaderData() as PricesLoaderData;
    return (
    <>
        <GenerateGraphOne prices={data.prices}/>
    </>
    )
}