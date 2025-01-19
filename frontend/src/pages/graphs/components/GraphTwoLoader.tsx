import { getAllForActiveEvent } from "../../../webservices/DrinkPricesWebService";
import { getMultiplePairs } from "../../../webservices/DrinkPairWebService";

export async function GraphTwoLoader() {
    const prices = await getAllForActiveEvent(true);
    const pairIds = prices.map((price: { pairId: number }) => price.pairId);
    const result = await getMultiplePairs(pairIds);
    const drinks = result.map(res => ({
        pairId: res.id,
        drinkOneName: res.idDrink_1?.name || '',
        drinkTwoName: res.idDrink_2?.name || '',
        drinkOneInc : res.price_inc_1,
        drinkOneDec : res.price_sub_1,
        drinkTwoInc : res.price_inc_2,
        drinkTwoDec : res.price_sub_2
    }));
    console.log(drinks);
    return { prices, drinks };
}