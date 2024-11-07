import { useLoaderData } from "react-router-dom";
import DrinkList from "./components/DrinkList/DrinkList";
import { DrinkDTO } from "../../models/DrinkModels";

interface DrinkLoaderData {
    drinks: DrinkDTO[]
}

export default function Drinks() {
    const data = useLoaderData() as DrinkLoaderData;
    
    return (<DrinkList drinks={data.drinks}/>)
}