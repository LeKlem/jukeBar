import { Button, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { Form } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CreateDrinkPairDTO } from "../../../../models/DrinkPairModels";
import { createDrinkPair } from "../../../../webservices/DrinkPairWebService";

interface InputDrinksData {
    drink1?: DrinkDTO,
    drink2?: DrinkDTO,
    drinkInc1: number,
    drinkInc2: number,
    drinkDec1: number,
    drinkDec2: number
}

interface DrinkPairFormProps {
    drinks: DrinkDTO[],
    eventId: number
}

export default function DrinkPairForm(props: DrinkPairFormProps) {
    const [drinkInputs, setDrinkInputs] = useState<InputDrinksData[]>([]);
    const [drinks, setDrinks] = useState<DrinkDTO[]>([]);

    useEffect(() => {
        setDrinks(props.drinks);
    }, [props.drinks]);

    const addDrinkInput = () => {
        setDrinkInputs(
            [
                ...drinkInputs,
                { drink1: undefined, drink2: undefined, drinkInc1: 0, drinkInc2: 0, drinkDec1: 0, drinkDec2: 0 }
            ]
        )
    }

    const deleteDrinkInput = (index: number) => {
        setDrinkInputs([...drinkInputs.filter((_, i) => i !== index)])
    }

    const onSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        drinkInputs.map(drinkPair => {
            const newPair: CreateDrinkPairDTO = {
                idEvent: props.eventId,
                idDrink_1: drinkPair.drink1?.id!,
                idDrink_2: drinkPair.drink2?.id!,
                price_inc_1: drinkPair.drinkInc1,
                price_inc_2: drinkPair.drinkInc2,
                price_sub_1: drinkPair.drinkDec1,
                price_sub_2: drinkPair.drinkDec2
            }
            const response = createDrinkPair(newPair)        
            console.log(response);
        })
    }

    const getAvailableDrinks = (index: number, field: 'drink1' | 'drink2'): DrinkDTO[] => {
        const selectedDrinks = drinkInputs
            .flatMap(pair => [pair.drink1, pair.drink2])
            .filter(drink => drink !== undefined) as DrinkDTO[];

        const selectedIds = new Set(selectedDrinks.map(drink => drink.id));

        const currentDrink = drinkInputs[index][field];
        if (currentDrink) selectedIds.delete(currentDrink.id);

        return drinks.filter(drink => !selectedIds.has(drink.id));
    }

    const displayDrinks = (index: number, field: 'drink1' | 'drink2') => {

        return getAvailableDrinks(index, field).map((drink, index) => (
            <option value={drink.id} key={index}>{drink.name}</option>
        ))
    }

    const onSelectDrink = (index: number, field: 'drink1' | 'drink2', value: number) => {
        const selectedDrink = props.drinks.find(drink => drink.id === value || null)
        const newPairs = [...drinkInputs];

        newPairs[index] = {
            ...newPairs[index],
            [field]: selectedDrink
        };
        setDrinkInputs(newPairs);
    }

    const displayFields = (drinkPair: InputDrinksData, index: number, field: 'drink1' | 'drink2') => {
        return (
            <div className={field}>
                <FormSelect
                    className="col"
                    value={drinkPair[field] ? drinkPair[field].id : ''}
                    onChange={(e) => onSelectDrink(index, field, parseInt(e.target.value))}>
                    <option defaultValue={undefined} hidden>Selectionnez une boisson</option>
                    {displayDrinks(index, field)}
                </FormSelect>
                <div className="prices d-flex mt-2 gap-1">
                    <FormGroup className="col">
                        <FormLabel>Prix d'incrément</FormLabel>
                        <FormControl type="number" />
                    </FormGroup>
                    <FormGroup className="col">
                        <FormLabel>Prix de décrément</FormLabel>
                        <FormControl type="number" />
                    </FormGroup>
                </div>
            </div>
        )
    }

    return (
        <>
            <Button onClick={addDrinkInput}>Ajouter</Button>
            <Form onSubmit={(e) => onSubmitForm(e)} className="d-flex flex-column gap-4">
                {drinkInputs.map((drinkPair, index) => (
                    <div className="drink-pair col-10 offset-2" key={index}>
                        <FormLabel>Paire de boisson</FormLabel>
                        <div className="d-flex gap-2">
                            {displayFields(drinkPair, index, 'drink1')}
                            {displayFields(drinkPair, index, 'drink2')}
                            <Button onClick={() => deleteDrinkInput(index)} variant="outline-danger">Delete</Button>
                        </div>
                    </div>
                ))}
                <Button className="col-1" type="submit">add</Button>
            </Form>
        </>
    )
}