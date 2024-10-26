import { Injectable } from '@nestjs/common';
import { CreateEventDrinksPairDto } from './dto/create-event-drinks-pair.dto';
import { UpdateEventDrinksPairDto } from './dto/update-event-drinks-pair.dto';

@Injectable()
export class EventDrinksPairsService {
  create(createEventDrinksPairDto: CreateEventDrinksPairDto) {
    return 'This action adds a new eventDrinksPair';
  }

  findAll() {
    return `This action returns all eventDrinksPairs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventDrinksPair`;
  }

  update(id: number, updateEventDrinksPairDto: UpdateEventDrinksPairDto) {
    return `This action updates a #${id} eventDrinksPair`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventDrinksPair`;
  }
}
