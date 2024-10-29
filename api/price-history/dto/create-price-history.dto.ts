import { IsNumber, IsDecimal, IsOptional } from 'class-validator';

export class CreatePriceHistoryDto {
  @IsNumber()
  pairId: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price_drink_1: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  price_drink_2: number;
}
