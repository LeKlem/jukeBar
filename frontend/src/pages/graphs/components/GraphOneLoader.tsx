import { getMultiplePairs } from "../../../webservices/DrinkPairWebService";
import { getAllForActiveEvent } from "../../../webservices/DrinkPricesWebService";

export async function GraphOneLoader() {
    const prices = await getAllForActiveEvent(false);
    const pairIds = prices.map((price: { pairId: number; }) => price.pairId);
    const result = await getMultiplePairs(pairIds);
    const drinksNames = result.map(res => ({
        pairId: res.id,
        drinkOneName: res.idDrink_1?.name || '',
        drinkTwoName: res.idDrink_2?.name || ''
    }));
    return { prices, drinksNames };
}