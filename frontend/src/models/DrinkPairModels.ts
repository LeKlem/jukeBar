import { DrinkDTO } from "./DrinkModels";
import { EventDTO } from "./EventModels";

export interface CreateDrinkPairDTO {
    idEvent: number,
    idDrink_1: number,
    idDrink_2: number,
    price_inc_1: number;
    price_inc_2: number,
    price_sub_1: number,
    price_sub_2: number,
    min_price_1: number,
    min_price_2: number
}

export interface DrinkPairDTO {
    id?: number
    idDrink_1?: DrinkDTO,
    idDrink_2?: DrinkDTO,
    idEvent?: EventDTO,
    price_inc_1: number,
    price_inc_2: number,
    price_sub_1: number,
    price_sub_2: number,
    min_price_1: number,
    min_price_2: number,
}

export interface UpdateDrinkPairDTO extends CreateDrinkPairDTO{
}