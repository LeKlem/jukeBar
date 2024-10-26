import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDrinksPairDto } from './create-event-drinks-pair.dto';

export class UpdateEventDrinksPairDto extends PartialType(CreateEventDrinksPairDto) {}
