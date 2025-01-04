import { IsNumber, IsPositive } from 'class-validator';

export class CreateEventDrinksPairDto {

  @IsNumber()
  @IsPositive()
  idDrink_1: number;

  @IsNumber()
  @IsPositive()
  idDrink_2: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price_inc_1: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price_sub_1: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price_inc_2: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price_sub_2: number;

  @IsNumber()
  @IsPositive()
  min_price_1 : number;
  
  @IsNumber()
  @IsPositive()
  min_price_2 : number;
}
