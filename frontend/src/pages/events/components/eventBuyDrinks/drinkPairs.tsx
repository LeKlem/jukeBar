import {
  FormGroup,
  FormLabel,
  Button,
  Row,
  Col,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import {
  ArrowDownRight,
  ArrowUpRight,
  CupStraw,
  BagPlus,
} from "react-bootstrap-icons";
import { useState, useEffect, useRef } from "react";
import { DrinkDTO } from "../../../../models/DrinkModels";
import { DrinkPairDTO } from "../../../../models/DrinkPairModels";
import { getDrinksPrices, buyDrink, removeLastAction } from "../../../../webservices/DrinkPricesWebService";

interface DrinkPairFormProps {
  drinks: DrinkDTO[];
  drinkPairs: DrinkPairDTO[];
  eventId: number;
}
interface DrinkPrices {
  pairId: number;
  price_drink_1: string;
  price_drink_2: string;
  time: string;
}

export default function DrinkPairForm(props: DrinkPairFormProps) {
  const [drinkInputs, setDrinkInputs] = useState<DrinkPairDTO[]>([]);
  const [drinks, setDrinks] = useState<DrinkDTO[]>([]);
  const [drinkPrices, setDrinkPrices] = useState<DrinkPrices[] | null>(null);
  const [nbOfDrinksSold, setNbOfDrinksSold] = useState(0);
  const queueRef = useRef<(() => Promise<void>)[]>([]);
  const isProcessingRef = useRef<boolean>(false);
  const lastExecutionRef = useRef<number>(0);

  useEffect(() => {
      setDrinks(props.drinks);
      setDrinkInputs(props.drinkPairs);
  }, [props.drinks]);

  useEffect(() => {
      const fetchPrices = async () => {
          if (props.drinks.length > 0) {
              const pairIds = props.drinkPairs
                  .map((pair) => pair.id)
                  .filter((id): id is number => id !== undefined);
              if (pairIds.length > 0) {
                  const prices = await getDrinksPrices(pairIds);
                  setDrinkPrices(prices);
              }
          }
      };
      fetchPrices();
  }, [props.drinkPairs, nbOfDrinksSold]);

  const processQueue = async () => {
      if (isProcessingRef.current) return;

      isProcessingRef.current = true;

      while (queueRef.current.length > 0) {
          const now = Date.now();
          const elapsed = now - lastExecutionRef.current;

          if (elapsed < 1000) {
              await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
          }

          const action = queueRef.current.shift();
          if (action) {
              await action();
              lastExecutionRef.current = Date.now();
          }
      }

      isProcessingRef.current = false;
  };

  const BuyADrink = async (id: number, isDrinkOne: boolean) => {
      queueRef.current.push(async () => {
          console.log(`Sending at ${new Date().toISOString()}`);
          await buyDrink(id, isDrinkOne);
          setNbOfDrinksSold((prev) => prev + 1);
      });

      processQueue(); // Start processing the queue
  };

  const displayFields = (
      drinkPair: DrinkPairDTO,
      field: "idDrink_1" | "idDrink_2"
  ) => {
      const pairPrices = drinkPrices?.find((price) => price.pairId === drinkPair.id);
      const isDrinkOne = field === "idDrink_1";
      const price = isDrinkOne
          ? pairPrices?.price_drink_1
          : pairPrices?.price_drink_2;

      return (
          <Col md={6}>
              <FormGroup>
                  <FormLabel>
                      <CupStraw className="me-2" />
                      {field === "idDrink_1"
                          ? drinkPair.idDrink_1?.name || "Unknown"
                          : drinkPair.idDrink_2?.name || "Unknown"}
                  </FormLabel>
                  <div className="d-flex align-items-center">
                      <span className="me-3 text-primary fw-bold">Prix: {price} €</span>
                      <Button
                          onClick={() => BuyADrink(pairPrices?.pairId || 0, isDrinkOne)}
                          variant="success"
                          size="sm"
                      >
                          <BagPlus className="me-1" /> Acheter
                      </Button>
                  </div>
              </FormGroup>
              <div className="prices mt-3">
                  <Row>
                      <Col>
                          <FormLabel>
                              <ArrowUpRight className="text-success" />
                          </FormLabel>
                          <p className="text-muted">
                              +{field === "idDrink_1" ? drinkPair.price_inc_1 * 100 : drinkPair.price_inc_2 * 100} €
                          </p>
                      </Col>
                      <Col>
                          <FormLabel>
                              <ArrowDownRight className="text-danger" />
                          </FormLabel>
                          <p className="text-muted">
                              -{field === "idDrink_1" ? drinkPair.price_sub_1 * 100 : drinkPair.price_sub_2 * 100} €
                          </p>
                      </Col>
                      <Col>
                          <FormLabel>Min:</FormLabel>
                          <p className="text-muted">
                              {field === "idDrink_1"
                                  ? drinkPair.min_price_1 * 100
                                  : drinkPair.min_price_2 * 100} €
                          </p>
                      </Col>
                  </Row>
              </div>
          </Col>
      );
  };

  const cancelAction = async (pairId: number) => {
      await removeLastAction(pairId);
      setNbOfDrinksSold(nbOfDrinksSold - 1);
  }

  return (
      <Container>
          <h2 className="text-center my-4 fw-bold text-uppercase"></h2>
          <Form className="d-flex flex-column gap-4">
              <div className="drink-pairs">
                  {drinkInputs.map((drinkPair, index) => (
                      <Card className="mb-4 shadow-sm" key={index}>
                          <Card.Body>
                              <Card.Title className="text-center">
                                  Drink Pair #{index + 1}
                              </Card.Title>
                              {/* <Button
                                  onClick={() => cancelAction(drinkPair?.id || 0)}
                                  variant="danger"
                                  size="sm"
                                  >
                                  <BagPlus className="me-1" /> Annuler
                              </Button> */}
                              <Row className="mt-3">
                                  {displayFields(drinkPair, "idDrink_1")}
                                  {displayFields(drinkPair, "idDrink_2")}
                              </Row>
                          </Card.Body>
                      </Card>
                  ))}
              </div>
          </Form>
      </Container>
  );
}