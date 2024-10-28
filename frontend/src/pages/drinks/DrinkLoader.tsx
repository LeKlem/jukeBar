import { DrinkDTO } from "../../models/DrinkModels";
import { getAllDrinks } from "../../webservices/DrinkWebService";

export default async function drinkLoader() {
    const drinks: DrinkDTO[] = await getAllDrinks();
    return { drinks };
}