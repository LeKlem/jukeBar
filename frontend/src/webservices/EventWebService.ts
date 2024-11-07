import axios from "axios";
import { EventDTO } from "../models/EventModels";

const url = import.meta.env.VITE_API_STRING + 'event';
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`
    }
}

export const getOneEvent = async (eventId: number): Promise<EventDTO> => {
    return (await axios.get(`${url}/${eventId}`, config)).data as EventDTO;
}

export const getEvents = async (): Promise<EventDTO[]> => {
    return (await axios.get(url, config)).data as EventDTO[];
}
export const createEvent = async (): Promise<EventDTO> => {
    return (await axios.post(url, {}, config)).data as EventDTO;
}

export const activateEvent = async (eventId: number) => {
    console.log('bonjour ' + eventId);
}