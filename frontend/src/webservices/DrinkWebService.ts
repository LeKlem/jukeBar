import axios from "axios";
import { CreateDrinkDTO, DrinkDTO } from "../models/DrinkModels";

const url = import.meta.env.VITE_API_STRING + 'drink';
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`
    }
}

export const createDrink = async(newDrink: CreateDrinkDTO): Promise<DrinkDTO> =>  {
    return ((await axios.post(url, newDrink, config)).data) as DrinkDTO;
}