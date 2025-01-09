import { useLoaderData } from "react-router-dom"
import { EventDTO } from "../../../../models/EventModels";
import { DrinkDTO } from "../../../../models/DrinkModels";
import DrinkPairForm from "./DrinkPairForm";
import { DrinkPairDTO } from "../../../../models/DrinkPairModels";
import { Button } from "react-bootstrap";
import { StopFill } from "react-bootstrap-icons";
import { stopEvent } from "../../../../webservices/EventWebService";
import DrinkPairDetails from "./DrinkPairDetails";

interface EventLoaderData {
    event: EventDTO,
    drinks: DrinkDTO[],
    drinkPairs: DrinkPairDTO[],
}

export default function EventDetails() {
    const data = useLoaderData() as EventLoaderData;

    const event = data.event;
    const date: Date = new Date(event.createdAt);

    const getButtonByStatus = (event: EventDTO) => {
        switch (event.active) {
            case true:
                return (<Button variant="danger d-flex align-items-center gap-2" onClick={() => stopEvent(event.id)}><StopFill size={25} /> Arrêter</Button>)
            case false:
                return (<p>Evènement terminé</p>)
            // case 'INACTIVE':
            //     return (<Button variant="success d-flex align-items-center gap-2"  onClick={() => activateEvent(event.id)}><PlayFill size={20}/>Commencer</Button>)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between mb-5">
                <h1>Evènement du {date.toLocaleDateString()}</h1>
                <div className="d-flex align-items-center">
                    {getButtonByStatus(event)}
                </div>
            </div>
            { event.active == true 
                ? (<DrinkPairForm drinkPairs={data.drinkPairs} drinks={data.drinks} eventId={event.id} />)
                : (<DrinkPairDetails />)}
        </>
    )
}