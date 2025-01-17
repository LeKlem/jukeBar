import { getAllForActiveEvent } from "../../../webservices/DrinkPricesWebService";

export async function GraphTwoLoader() {
    const prices = await getAllForActiveEvent();
    return {prices}
}