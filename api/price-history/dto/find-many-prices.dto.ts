import { IsNumber, IsDecimal, IsOptional, arrayNotEmpty } from 'class-validator';

export class findManyPrices {
    @IsNumber({},{each:true})
    ids: number[];
}
