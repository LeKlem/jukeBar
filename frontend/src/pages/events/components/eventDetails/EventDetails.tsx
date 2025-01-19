import { useLoaderData } from "react-router-dom";
import { EventDTO } from "../../../../models/EventModels";
import { DrinkDTO } from "../../../../models/DrinkModels";
import DrinkPairForm from "./DrinkPairForm";
import { DrinkPairDTO } from "../../../../models/DrinkPairModels";
import { Button } from "react-bootstrap";
import { StopFill } from "react-bootstrap-icons";
import { stopEvent } from "../../../../webservices/EventWebService";
import DrinkPairDetails from "./DrinkPairDetails";
import { EVENT_TTL } from "../../../../const/const";
import { useState } from "react";

interface EventLoaderData {
    event: EventDTO;
    drinks: DrinkDTO[];
    drinkPairs: DrinkPairDTO[];
}

export default function EventDetails() {
    const data = useLoaderData() as EventLoaderData;
    const event = data.event;
    const date: Date = new Date(event.createdAt);
    const [eventStopped, setEventStopped] = useState<boolean>(false);

    const eventStop = async (id: number) => {
        await stopEvent(id);
        setEventStopped(true);
    };
    const getButtonByStatus = () => {
        const eventDate = new Date(event.createdAt);
        const isEventActive = eventDate > new Date(Date.now() - EVENT_TTL) && event.active && !eventStopped;

        if (isEventActive) {
            return (
                <Button
                    variant="danger d-flex align-items-center gap-2"
                    onClick={() => eventStop(event.id)}
                >
                    <StopFill size={25} /> Arrêter
                </Button>
            );
        } else {
            return <p>Evènement terminé</p>;
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-5">
                <h1>Evènement du {date.toLocaleDateString()}</h1>
                <div className="d-flex align-items-center">{getButtonByStatus()}</div>
            </div>
            {event.active && !eventStopped? (
                <DrinkPairForm drinkPairs={data.drinkPairs} drinks={data.drinks} eventId={event.id} />
            ) : (
                <DrinkPairDetails />
            )}
        </>
    );
}
