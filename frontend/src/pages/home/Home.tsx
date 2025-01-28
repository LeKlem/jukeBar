import { useLoaderData, useNavigate } from "react-router-dom";
import { EventDTO } from "../../models/EventModels";
import EventTable from "../events/components/eventTable/EventTable";

interface EventsLoaderData {
    events: EventDTO[]
}

export default function Home() {
    const navigate = useNavigate();
    const data  = useLoaderData()  as EventsLoaderData;
    if(!localStorage.getItem('Bearer')){
        navigate('/graphs');
    }
    return (
    <>
        <EventTable events={data.events}/>
    </>
    )
}