import { useLoaderData } from "react-router-dom";

import GenerateGraphOne from "../components/GraphOne.tsx";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";

interface PricesLoaderData {
    prices: PriceHistoryDTO[]
    drinks :{
        pairId: number;
        drinkOneName: string;
        drinkTwoName: string;
        drinkOneInc : number;
        drinkOneDec : number;
        drinkTwoInc : number;
        drinkTwoDec : number;
    }[]
}

export default function GraphOne() {
    const data = useLoaderData() as PricesLoaderData;
    return (
        <div className="graphOne">
            <GenerateGraphOne prices={data.prices} drinks={data.drinks}/>
        </div>
    )
}
