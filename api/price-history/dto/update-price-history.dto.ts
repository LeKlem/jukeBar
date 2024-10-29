import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceHistoryDto } from './create-price-history.dto';

export class UpdatePriceHistoryDto extends PartialType(CreatePriceHistoryDto) {}
