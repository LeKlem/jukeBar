import { useLoaderData } from "react-router-dom";
import { EventDTO } from "../../models/EventModels";
import EventTable from "../events/components/eventTable/EventTable";

interface EventsLoaderData {
    events: EventDTO[]
}

export default function Home() {
    const data  = useLoaderData()  as EventsLoaderData;
        
    return (
    <>
        <EventTable events={data.events}/>
    </>
    )
}