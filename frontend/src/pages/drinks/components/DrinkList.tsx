import { Button, Table } from "react-bootstrap";
import { DrinkDTO } from "../../../models/DrinkModels";
import { PlusSquare, Trash, PencilSquare } from "react-bootstrap-icons";
import './DrinkList.scss'
import { CustomModalProps, useModal } from "../../../context/ModalContext";
import DrinkForm from "./DrinkForm/DrinkForm";
import { useEffect, useState } from "react";
import { deleteOneDrink } from "../../../webservices/DrinkWebService";

interface DrinkListProps {
    drinks: DrinkDTO[]
}

export default function DrinkList(props: DrinkListProps) {
    const [drinks, setDrinks] = useState<DrinkDTO[]>([]);
    const { openModal } = useModal();
    
    useEffect(() => {
        setDrinks([...props.drinks])
    }, [props.drinks]);

    const handleDrinkCreation = (drink: DrinkDTO) => {
        setDrinks([drink, ...drinks]);
    }

    const modal: CustomModalProps = {
        content: <DrinkForm onCreateDrink={handleDrinkCreation}/>,
        header: 'Ajout d\'une boisson',
    }

    const deleteDrink = async (deleteDrink: DrinkDTO) => {
        try {
            await deleteOneDrink(deleteDrink.id);
            setDrinks(drinks.filter(drink => drink.id != deleteDrink.id));
        } catch (error) {
            console.log(error);
        }
    }

    const displayDrinks = (drinks: DrinkDTO[]) => {
        return drinks.map((drink, index) => (
            <tr key={index}>
                <td>{ drink.id }</td>
                <td>{ drink.name }</td>
                <td>{ drink.price }</td>
                <td className="d-flex justify-content-center gap-3">
                    <Button variant="outline-primary">
                        <PencilSquare/>
                    </Button>
                    <Button variant="danger" onClick={() => deleteDrink(drink)}>
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