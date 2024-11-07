import axios from "axios";
import { CreateDrinkPairDTO } from "../models/DrinkPairModels";

const url = import.meta.env.VITE_API_STRING + 'event-drinks-pairs';
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`
    }
}

export const createDrinkPair = async (newDrinkPair: CreateDrinkPairDTO) => {
    return (await axios.post(url, newDrinkPair, config)).data;
}