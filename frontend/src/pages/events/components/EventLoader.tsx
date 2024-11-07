import { Params } from "react-router-dom";
import { getEvents, getOneEvent } from "../../../webservices/EventWebService";
import { getAllDrinks } from "../../../webservices/DrinkWebService";

export async function EventLoader({ params }: { params: Params<'eventId'> }) {
    if(params.eventId){
        const event = await getOneEvent(parseInt(params.eventId))
        const drinks = await getAllDrinks();
        return {event, drinks};
    }
}

export async function EventsLoader() {
    const events = await getEvents();
    return {events}
}