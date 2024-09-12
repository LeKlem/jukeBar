import { IsNotEmpty, Length } from 'class-validator';

export class CreateDrinkDto {

  @IsNotEmpty()
  name: string;
}
