import { Params } from "react-router-dom";
import { getEvents, getOneEvent } from "../../../webservices/EventWebService";
import { getAllDrinks } from "../../../webservices/DrinkWebService";
import { getPairsFromEvent } from "../../../webservices/DrinkPairWebService";

export async function EventLoader({ params }: { params: Params<'eventId'> }) {
    if(params.eventId){
        const event = await getOneEvent(parseInt(params.eventId))
        const drinks = await getAllDrinks();
        const drinkPairs = await getPairsFromEvent(parseInt(params.eventId));
        drinkPairs.map(drinkPair => {
            drinkPair.min_price_1 /= 100;
            drinkPair.min_price_2 /= 100;
            drinkPair.price_inc_1 /= 100;
            drinkPair.price_inc_2 /= 100;
            drinkPair.price_sub_1 /= 100;
            drinkPair.price_sub_2 /= 100;
        })
        return {event, drinks, drinkPairs};
    }
}

export async function EventsLoader() {
    const events = await getEvents();
    return {events}
}