import { useLoaderData } from "react-router-dom";
import { PriceHistoryDTO } from "../../../models/Price-history.ts";
import GenerateGraphTwo from "../components/GraphTwo.tsx";

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

export default function GraphTwo() {
    const data = useLoaderData() as PricesLoaderData;
    return (
    <div className="graphTwo">
        <GenerateGraphTwo prices={data.prices} drinks={data.drinks}/>
    </div>
    )
}