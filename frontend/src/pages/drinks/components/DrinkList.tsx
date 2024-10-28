import { Button, Table } from "react-bootstrap";
import { Drink } from "../../../models/DrinkModels";
import { PlusSquare, Trash, PencilSquare } from "react-bootstrap-icons";
import './DrinkList.scss'
import { CustomModalProps, useModal } from "../../../context/ModalContext";
import DrinkForm from "./DrinkForm/DrinkForm";

export default function DrinkList() {
    const drinks: Drink[] = [];
    const { openModal } = useModal();
    
    const modal: CustomModalProps = {
        content: <DrinkForm/>,
        header: 'Bonjour',
    }

    for (let i = 0; i < 20; i++) {
        const drink: Drink = {
            id: i,
            name: 'Toto',
            price: 2.5
        }
        drinks.push(drink);
    }

    const displayDrinks = (drinks: Drink[]) => {
        return drinks.map((drink, index) => (
            <tr key={index}>
                <td>{ drink.id }</td>
                <td>{ drink.name }</td>
                <td>{ drink.price }</td>
                <td className="d-flex justify-content-center gap-3">
                    <Button variant="outline-primary">
                        <PencilSquare/>
                    </Button>
                    <Button variant="danger">
                        <Trash/>
                    </Button>
                </td>
            </tr>
        ))
    }

    return (
        <>
            <div className="title d-flex justify-content-between">
                <h1>Boissons</h1>
                <Button className="d-flex event-create gap-2 align-items-center" onClick={() => openModal(modal)}>
                    Créer
                    <PlusSquare/>
                </Button>
            </div>
            <div className="drink-list border rounded">
                <Table striped>
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { displayDrinks(drinks) }
                    </tbody>
                </Table>
            </div>
        </>
    )
}