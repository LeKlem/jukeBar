import { useLoaderData } from "react-router-dom"
import { EventDTO } from "../../../../models/EventModels";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { DrinkPairDTO } from "../../../../models/DrinkPairModels";
import DrinkPairForm from "./DrinkPairs";

interface EventLoaderData {
    event: EventDTO,
    drinks: DrinkDTO[],
    drinkPairs: DrinkPairDTO[],
}

export default function EventDetails() {
    const data = useLoaderData() as EventLoaderData;
    const event = data.event;
    const date: Date = new Date(event.createdAt);

    return (
        <>
            <div className="d-flex justify-content-between mb-5">
                <h1>{date.toLocaleDateString()} - Gestion des ventes</h1>
            </div>
            { event.active == true 
                ? (<DrinkPairForm drinkPairs={data.drinkPairs} drinks={data.drinks} eventId={event.id} />)
                : ''}
        </>
    )
}