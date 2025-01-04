import axios from "axios";
import { CreateDrinkPairDTO, DrinkPairDTO, UpdateDrinkPairDTO } from "../models/DrinkPairModels";

const url = import.meta.env.VITE_API_STRING + 'event-drinks-pairs';
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`
    }
}

export const createDrinkPair = async (newDrinkPair: CreateDrinkPairDTO): Promise<DrinkPairDTO> => {
    return (await axios.post(url, newDrinkPair, config)).data;
}

export const getPairsFromEvent = async (eventId: number): Promise<DrinkPairDTO[]> => {
    return (await axios.get(`${url}/event/${eventId}`, config)).data;
}

export const deleteEventPair = async (id: number) => {
    axios.delete(`${url}/${id}`, config);
}

export const updateEventPair = async (id:number ,updatedPair: UpdateDrinkPairDTO) => {
    axios.patch(`${url}/${id}`, updatedPair, config);
}