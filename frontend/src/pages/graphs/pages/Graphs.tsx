import { useLoaderData } from "react-router-dom";

import GenerateGraphOne from "../components/GraphOne.tsx";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";

interface PricesLoaderData {
    prices: PriceHistoryDTO[],
    drinksNames:{
        pairId : number,
        drinkOneName: string,
        drinkTwoName : string
    }[],
}

export default function Graph() {
    const data = useLoaderData() as PricesLoaderData;
    return (
    <div className="graphOne">
        <GenerateGraphOne prices={data.prices} drinksName={data.drinksNames}/>
    </div>
    )
}