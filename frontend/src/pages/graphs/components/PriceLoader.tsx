import { getAllForActiveEvent } from "../../../webservices/DrinkPricesWebService";

export async function PricesLoader() {
    const prices = await getAllForActiveEvent();
    return {prices}
}