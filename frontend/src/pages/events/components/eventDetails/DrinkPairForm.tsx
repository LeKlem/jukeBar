import { Button, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { Form } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CreateDrinkPairDTO, DrinkPairDTO } from "../../../../models/DrinkPairModels";
import { createDrinkPair, deleteEventPair, updateEventPair } from "../../../../webservices/DrinkPairWebService";
import { Floppy, PlusSquare, TrashFill } from "react-bootstrap-icons";

interface DrinkPairFormProps {
    drinks: DrinkDTO[],
    drinkPairs: DrinkPairDTO[]
    eventId: number
}

export default function DrinkPairForm(props: DrinkPairFormProps) {
    const [drinkInputs, setDrinkInputs] = useState<DrinkPairDTO[]>([]);
    const [drinks, setDrinks] = useState<DrinkDTO[]>([]);

    useEffect(() => {
        setDrinks(props.drinks);
        setDrinkInputs(props.drinkPairs);
    }, [props.drinks]);

    const addDrinkInput = () => {
        setDrinkInputs(
            [
                ...drinkInputs,
                { idDrink_1: undefined, idDrink_2: undefined, idEvent: undefined, price_inc_1: 0, price_inc_2: 0, price_sub_1: 0, price_sub_2: 0, min_price_1: 0, min_price_2: 0 }
            ]
        )
    }

    const deleteDrinkInput = (index: number) => {
        const selectedDrink = drinkInputs[index];
        setDrinkInputs([...drinkInputs.filter((_, i) => i !== index)])
        if (selectedDrink.id) {
            deleteEventPair(selectedDrink.id);
        }
    }

    const onSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        drinkInputs.map(async drinkPair => {
            const newPair: CreateDrinkPairDTO = {
                idEvent: props.eventId,
                idDrink_1: drinkPair.idDrink_1?.id!,
                idDrink_2: drinkPair.idDrink_2?.id!,
                price_inc_1: drinkPair.price_inc_1 * 100,
                price_inc_2: drinkPair.price_inc_2 * 100,
                price_sub_1: drinkPair.price_sub_1 * 100,
                price_sub_2: drinkPair.price_sub_2 * 100,
                min_price_1: drinkPair.min_price_1 * 100,
                min_price_2: drinkPair.min_price_2 * 100
            }

            if (drinkPair.id) {
                await updateEventPair(drinkPair.id, newPair);
                return
            }
            await createDrinkPair(newPair)
        })
    }

    const getAvailableDrinks = (index: number, field: 'idDrink_1' | 'idDrink_2'): DrinkDTO[] => {
        const selectedDrinks = drinkInputs
            .flatMap(pair => [pair.idDrink_1, pair.idDrink_2])
            .filter(drink => drink !== undefined) as DrinkDTO[];

        const selectedIds = new Set(selectedDrinks.map(drink => drink.id));

        const currentDrink = drinkInputs[index][field];
        if (currentDrink) selectedIds.delete(currentDrink.id);

        return drinks.filter(drink => !selectedIds.has(drink.id));
    }

    const displayDrinks = (index: number, field: 'idDrink_1' | 'idDrink_2') => {

        return getAvailableDrinks(index, field).map((drink, index) => (
            <option value={drink.id} key={index}>{drink.name}</option>
        ))
    }

    const onSelectDrink = (index: number, field: 'idDrink_1' | 'idDrink_2', value: number) => {
        const selectedDrink = props.drinks.find(drink => drink.id === value || null)
        const newPairs = [...drinkInputs];

        newPairs[index] = {
            ...newPairs[index],
            [field]: selectedDrink
        };
        setDrinkInputs(newPairs);
    }

    const onDrinkPriceChange = (
        index: number,
        label: 'price_inc_1' | 'price_inc_2' | 'price_sub_1' | 'price_sub_2' | 'min_price_1' | 'min_price_2',
        value: number
    ) => {
        drinkInputs[index][label] = value;
        setDrinkInputs(drinkInputs);
    }

    const displayFields = (drinkPair: DrinkPairDTO, index: number, field: 'idDrink_1' | 'idDrink_2') => {
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
                        <FormLabel>Incrémentation</FormLabel>
                        <FormControl
                            type="number"
                            onChange={(e) => onDrinkPriceChange(index, field == 'idDrink_1' ? 'price_inc_1' : 'price_inc_2', parseFloat(e.target.value))}
                            step={0.1}
                            min={0}
                            defaultValue={field == 'idDrink_1' ? drinkPair.price_inc_1 : drinkPair.price_inc_2}
                        />
                    </FormGroup>
                    <FormGroup className="col">
                        <FormLabel>Décrémentation</FormLabel>
                        <FormControl
                            type="number"
                            onChange={(e) => onDrinkPriceChange(index, field == 'idDrink_1' ? 'price_sub_1' : 'price_sub_2', parseFloat(e.target.value))}
                            step={0.1}
                            min={0}
                            defaultValue={field == 'idDrink_1' ? drinkPair.price_sub_1 : drinkPair.price_sub_2}
                        />
                    </FormGroup>
                    <FormGroup className="col">
                        <FormLabel>Prix minimum</FormLabel>
                        <FormControl
                            type="number"
                            onChange={(e) => onDrinkPriceChange(index, field == 'idDrink_1' ? 'min_price_1' : 'min_price_2', parseFloat(e.target.value))}
                            step={0.5}
                            min={0}
                            defaultValue={field == 'idDrink_1' ? drinkPair.min_price_1 : drinkPair.min_price_2}
                        />
                    </FormGroup>
                </div>
            </div>
        )
    }

    return (
        <>
            <Form onSubmit={(e) => onSubmitForm(e)} className="d-flex flex-column gap-4 align-items-center mb-5">
                <div className="col-3 d-flex gap-3">
                    <Button onClick={addDrinkInput} className="d-flex align-items-center gap-2 col justify-content-center"><PlusSquare />Pair</Button>
                    <Button className="col d-flex gap-2 align-items-center justify-content-center" type="submit"><Floppy />Enregistrer</Button>
                </div>
                <div className="drink-pairs d-flex flex-column gap-4">
                    {drinkInputs.map((drinkPair, index) => (
                        <div className="drink-pair border rounded px-3 py-3" key={index}>
                            <FormLabel>Paire de boisson n°{index + 1}</FormLabel>
                            <div className="d-flex gap-2">
                                {displayFields(drinkPair, index, 'idDrink_1')}
                                {displayFields(drinkPair, index, 'idDrink_2')}
                                <Button onClick={() => deleteDrinkInput(index)} variant="outline-danger"><TrashFill /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    )
}