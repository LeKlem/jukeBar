import { getMultiplePairs } from "../../../webservices/DrinkPairWebService";
import { getAllForActiveEvent } from "../../../webservices/DrinkPricesWebService";
export async function GraphsLoader() {
    const maxPrices = await getAllForActiveEvent(true);//To do : get Max prices from prices programatically
    const prices = await getAllForActiveEvent(false);

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
    return { maxPrices, prices, drinks };
}