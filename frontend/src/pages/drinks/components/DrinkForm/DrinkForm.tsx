import { FormEvent, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-router-dom";
import { useModal } from "../../../../context/ModalContext";
import { CreateDrinkDTO, DrinkDTO } from "../../../../models/DrinkModels";
import { createDrink, updateDrink } from "../../../../webservices/DrinkWebService";
interface DrinkFormProps {
    onFormSubmit: (createdDrink: DrinkDTO) => void;
    updatedDrink?: DrinkDTO
}


export default function DrinkForm(props: DrinkFormProps) {
    const {closeModal} = useModal();
    const [name, setName] = useState(props.updatedDrink?.name ?? '');
    const [price, setPrice] = useState(props.updatedDrink?.price.toString() ?? '0');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (props.updatedDrink) {
            const updatedDrink: DrinkDTO = await updateDrink({ name: name, price: parseFloat(price) }, props.updatedDrink.id);
            props.onFormSubmit(updatedDrink);
            closeModal();
            return;
        }
        const newDrinkDTO: CreateDrinkDTO = {
            name: name,
            price: parseFloat(price)
        }

        try {
            const createdDrinkDTO: DrinkDTO = await createDrink(newDrinkDTO);
            props.onFormSubmit(createdDrinkDTO);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
                <FormLabel>Nom</FormLabel>
                <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Prix</FormLabel>
                <FormControl type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </FormGroup>
            <div className="actions d-flex gap-3 justify-content-center mt-3">
                <Button type="submit" variant="success" className="col-3">{ props.updatedDrink ? 'Modifier' : 'Créer' }</Button>
                <Button variant="outline-danger"  className="col-3" onClick={() => closeModal()}>Annuler</Button>
            </div>
        </Form>
    )
}