import { Params } from "react-router-dom";
import { getEvents, getOneEvent } from "../../../webservices/EventWebService";

export async function EventLoader({ params }: { params: Params<'eventId'> }) {
    if(params.eventId){
        const event = await getOneEvent(parseInt(params.eventId))
        return {event};
    }
}

export async function EventsLoader() {
    const events = await getEvents();
    return {events}
}