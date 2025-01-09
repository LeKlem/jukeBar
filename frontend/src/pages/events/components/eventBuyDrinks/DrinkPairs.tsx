import { FormGroup, FormLabel, FormSelect, Button, Row, Col, Container } from "react-bootstrap";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { Form } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CreateDrinkPairDTO, DrinkPairDTO } from "../../../../models/DrinkPairModels";
import { getDrinksPrices, buyDrink } from "../../../../webservices/DrinkPricesWebService";
import { ArrowDownRight, ArrowUpRight, CupStraw, BagPlus } from "react-bootstrap-icons";

interface DrinkPairFormProps {
    drinks: DrinkDTO[];
    drinkPairs: DrinkPairDTO[];
    eventId: number;
}
interface DrinkPrices {
    pairId : number;
    price_drink_1: string;
    price_drink_2: string;
    time: string;
}


export default function DrinkPairForm(props: DrinkPairFormProps) {
    const [drinkInputs, setDrinkInputs] = useState<DrinkPairDTO[]>([]);
    const [drinks, setDrinks] = useState<DrinkDTO[]>([]);
    const [drinkPrices, setDrinkPrices] = useState<DrinkPrices[] | null>(null);

    useEffect(() => {
        setDrinks(props.drinks);
        setDrinkInputs(props.drinkPairs);
    }, [props.drinks]);

    useEffect(() => {
        const fetchPrices = async () => {
            if (props.drinks.length > 0) {
                const pairIds = props.drinkPairs.map((pair) => pair.id).filter((id): id is number => id !== undefined);
                if (pairIds.length > 0) {
                    const prices = await getDrinksPrices(pairIds);
                    console.log("received : ");
                    console.log(prices);

                    setDrinkPrices(prices);
                }
            }
        };

        fetchPrices();
    }, [props.drinkPairs]);

    const getAvailableDrinks = (index: number, field: "idDrink_1" | "idDrink_2"): DrinkDTO[] => {
        const selectedDrinks = drinkInputs
            .flatMap((pair) => [pair.idDrink_1, pair.idDrink_2])
            .filter((drink) => drink !== undefined) as DrinkDTO[];

        const selectedIds = new Set(selectedDrinks.map((drink) => drink.id));
        const currentDrink = drinkInputs[index][field];

        if (currentDrink) selectedIds.delete(currentDrink.id);

        return drinks.filter((drink) => !selectedIds.has(drink.id));
    };

    const displayFields = (drinkPair: DrinkPairDTO, index: number, field: "idDrink_1" | "idDrink_2") => {
        const pairPrices = drinkPrices?.find(price => price.pairId === drinkPair.id);
        const isDrinkOne = field === "idDrink_1" ? true : false;
        const price = isDrinkOne? pairPrices?.price_drink_1 : pairPrices?.price_drink_2;
        if(pairPrices?.pairId !== undefined){
            return (
                <Col md={6}>
                    <FormGroup>
                        <FormLabel>
                            <CupStraw />
                        </FormLabel>
                        <FormLabel>
                            {getAvailableDrinks(index, field).map((drink) => (
                                <option value={drink.id} key={drink.id}>
                                    {drink.name}
                                </option>
                            ))} prix {price} €
                            <Button onClick={() => buyDrink(pairPrices?.pairId, isDrinkOne)} variant="outline-danger"><BagPlus /></Button>


                        </FormLabel> 
                    </FormGroup>
                    <div className="prices mt-3">
                        <Row>
                            <Col>
                                <FormLabel>
                                    <ArrowUpRight />
                                </FormLabel>
                                <p className="text-muted">
                                    {field === "idDrink_1" ? drinkPair.price_inc_1 : drinkPair.price_inc_2} €
                                </p>
                            </Col>
                            <Col>
                                <FormLabel>
                                    <ArrowDownRight />
                                </FormLabel>
                                <p className="text-muted">
                                    {field === "idDrink_1" ? drinkPair.price_sub_1 : drinkPair.price_sub_2} €
                                </p>
                            </Col>
                            <Col>
                                <FormLabel>min</FormLabel>
                                <p className="text-muted">
                                    {field === "idDrink_1" ? drinkPair.min_price_1 : drinkPair.min_price_2} €
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            );
        };
    }

    return (
        <Container>
            <h2 className="text-center my-4">Formulaire de Paires de Boissons</h2>
            <Form className="d-flex flex-column gap-4">
                <div className="drink-pairs">
                    {drinkInputs.map((drinkPair, index) => (
                        <div className="drink-pair border rounded px-3 py-3 mb-4" key={index}>
                            <h5 className="text-center">Paire de boisson n°{index + 1}</h5>
                            <Row className="mt-3">
                                {displayFields(drinkPair, index, "idDrink_1")}
                                {displayFields(drinkPair, index, "idDrink_2")}
                            </Row>
                        </div>
                    ))}
                </div>
            </Form>
        </Container>
    );
}
