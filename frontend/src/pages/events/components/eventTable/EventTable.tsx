import { Button, Table } from "react-bootstrap";
import { EventDTO } from "../../../../models/EventModels";
import { CheckSquareFill, ListTask, PlusSquare, XSquareFill } from 'react-bootstrap-icons';
import './EventTable.scss'
import { Link } from "react-router-dom";
import { createEvent } from "../../../../webservices/EventWebService";
import { useEffect, useState } from "react";


interface EventTableProps {
    events: EventDTO[]
}

export default function EventTable(props: EventTableProps) {
    const [events, setEvents] = useState<EventDTO[]>([]);

    useEffect(() => {
        setEvents(props.events);
    }, [props.events])

    const displayEvents = (events: EventDTO[]) => {
        return events.map((event, index) => (
            <tr key={index}>
                <td>{event.id}</td>
                <td>{ new Date(event.date).toLocaleDateString() }</td>
                <td className="text-center">{event.active ? <CheckSquareFill size={25} color="green"/> : <XSquareFill size={25} color="red"/>}</td>
                <td className="d-flex justify-content-center col">
                    {/* TODO faire redirection quand page détails d'event dispo */}
                    <Link to={`events/${event.id}`} className="btn btn-outline-primary"><ListTask/></Link>
                </td>
            </tr>
        ))
    }

    const onCreateEvent = async () => {
        const createdEvent = await createEvent();
        setEvents([createdEvent, ...events])
    }

    return (
        <>
            <div className="title d-flex justify-content-between">
                <h2>Evènements</h2>
                {/* TODO faire la création d'évènement quand il y aura la route */}
                <Button className="d-flex event-create gap-2 align-items-center" onClick={onCreateEvent}>
                    Créer
                    <PlusSquare/>
                </Button>
            </div>
            <div className="event-list border rounded">
                <Table striped>
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Date</th>
                            <th className="text-center">Actif</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayEvents(events)}
                    </tbody>
                </Table>
            </div>
        </>
    )
}