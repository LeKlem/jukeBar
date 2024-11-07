import { IsNumber, IsPositive } from 'class-validator';

export class CreateEventDrinksPairDto {
  @IsNumber()
  @IsPositive()
  idEvent: number;

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
  minPrice_1 : number;
  
  @IsNumber()
  @IsPositive()
  minPrice_2 : number;
}
