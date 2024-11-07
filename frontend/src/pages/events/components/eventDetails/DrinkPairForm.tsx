import { Button, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { Form } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

interface InputDrinksData {
    drink1?: DrinkDTO,
    drink2?: DrinkDTO,
}

interface DrinkPairFormProps {
    drinks: DrinkDTO[]
}

export default function DrinkPairForm(props: DrinkPairFormProps) {
    const [drinkInputs, setDrinkInputs] = useState<InputDrinksData[]>([]);
    const [drinks, setDrinks] = useState<DrinkDTO[]>([]);

    useEffect(() => {
        setDrinks(props.drinks);
    }, [props.drinks]);

    const addDrinkInput = () => {
        setDrinkInputs([...drinkInputs, { drink1: undefined, drink2: undefined }])
    }

    const deleteDrinkInput = (index: number) => {
        setDrinkInputs([...drinkInputs.filter((_, i) => i !== index)])
    }

    const onSubmitForm = (event: FormEvent) => {
        //TODO ajouter en db la pair pour un event
        console.log(drinkInputs);
    }

    const getAvailableDrinks = (index: number, field: 'drink1' | 'drink2'): DrinkDTO[] => {
        const selectedDrinks = drinkInputs
            .flatMap(pair => [pair.drink1, pair.drink2])
            .filter(drink => drink !== undefined) as DrinkDTO[];
        
        const selectedIds = new Set(selectedDrinks.map(drink => drink.id));

        const currentDrink = drinkInputs[index][field];
        if(currentDrink) selectedIds.delete(currentDrink.id);

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

    return (
        <>
            <Button onClick={addDrinkInput}>Ajouter</Button>
            <Form onSubmit={(e) => onSubmitForm(e)} className="d-flex flex-column gap-4">
                {drinkInputs.map((drinkPair, index) => (
                    <div className="drink-pair col-8 offset-2" key={index}>
                        <FormLabel>Paire de boisson</FormLabel>
                        <div className="d-flex gap-2">
                            <FormGroup className="d-flex gap-3">
                                <FormSelect
                                    className="col"
                                    value={drinkPair.drink1 ? drinkPair.drink1.id : ''}
                                    onChange={(e) => onSelectDrink(index, 'drink1', parseInt(e.target.value))}>
                                    <option defaultValue={undefined} hidden>Selectionnez une boisson</option>
                                    {displayDrinks(index, 'drink1')}
                                </FormSelect>
                                <FormSelect
                                    className="col"
                                    value={drinkPair.drink2 ? drinkPair.drink2.id : ''}
                                    onChange={(e) => onSelectDrink(index, 'drink2', parseInt(e.target.value))}>
                                    <option defaultValue={undefined} hidden>Selectionnez une boisson</option>
                                    {displayDrinks(index, 'drink2')}
                                </FormSelect>
                            </FormGroup>
                            <Button onClick={() => deleteDrinkInput(index)} variant="danger">Delete</Button>
                        </div>
                    </div>
                ))}
                <Button className="col-1" type="submit">add</Button>
            </Form>
        </>
    )
}