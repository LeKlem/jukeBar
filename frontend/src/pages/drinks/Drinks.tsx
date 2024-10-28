import { useLoaderData } from "react-router-dom";
import DrinkList from "./components/DrinkList";
import { DrinkDTO } from "../../models/DrinkModels";
import { getAllDrinks } from "../../webservices/DrinkWebService";

interface DrinkLoaderData {
    drinks: DrinkDTO[]
}

export default function Drinks() {
    const data = useLoaderData() as DrinkLoaderData;
    
    return (<DrinkList drinks={data.drinks}/>)
}

export async function drinkLoader() {
    const drinks: DrinkDTO[] = await getAllDrinks();
    return { drinks };
}