import { useLoaderData } from "react-router-dom"
import { EventDTO } from "../../../../models/EventModels";

interface EventLoaderData {
    event: EventDTO
}

export default function EventDetails() {
    const data = useLoaderData() as EventLoaderData;
    const event = data.event;
    const date: Date = new Date(event.date);
    
    return (
    <>
        <h1>Evènement du { date.toLocaleDateString() }</h1>
    </>
)
}