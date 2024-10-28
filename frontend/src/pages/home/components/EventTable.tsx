import { Button, Table } from "react-bootstrap";
import { Event } from "../../../models/EventModels";
import { ListTask, PlusSquare } from 'react-bootstrap-icons';
import './EventTable.scss'

export default function EventTable() {
    const events: Event[] = [];

    for (let i = 0; i < 30; i++) {
        const event: Event = {
            id: i + 1,
            date: Date(),
            active: false
        }
        events.push(event);
    }

    const displayEvents = (events: Event[]) => {
        return events.map((event, index) => (
            <tr key={index}>
                <td>{event.id}</td>
                <td>{event.date}</td>
                <td>{event.active ? 'true' : 'false'}</td>
                <td className="d-flex justify-content-center col">
                    {/* TODO faire redirection quand page détails d'event dispo */}
                    <Button>
                        <ListTask />
                    </Button>
                </td>
            </tr>
        ))
    }

    return (
        <>
            <div className="title d-flex justify-content-between">
                <h2>Evènements</h2>
                {/* TODO faire la création d'évènement quand il y aura la route */}
                <Button className="d-flex event-create gap-2 align-items-center">
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
                            <th>Actif</th>
                            <th>Actions</th>
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