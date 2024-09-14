import { IsNotEmpty, Min} from 'class-validator';

export class CreateDrinkDto {

  @IsNotEmpty()
  name: string;
  
  @Min(0)
  price : number;
}
