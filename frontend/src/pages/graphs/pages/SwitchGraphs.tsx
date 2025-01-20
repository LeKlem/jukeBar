import { useLoaderData } from "react-router-dom";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";
import GenerateGraphs from "../components/Graphs.tsx";


interface PricesLoaderData {
    maxPrices: PriceHistoryDTO[]
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

export default function SwithGraphs() {
    const data = useLoaderData() as PricesLoaderData;
    return (
        <div className="graphOne graphTwo">
            <GenerateGraphs prices={data.prices} drinks={data.drinks} maxPrices={data.maxPrices}/>
        </div>
    )
    
    
}