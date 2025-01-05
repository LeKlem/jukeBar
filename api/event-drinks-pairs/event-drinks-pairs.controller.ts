import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventDrinksPairsService } from './event-drinks-pairs.service';
import { CreateEventDrinksPairDto } from './dto/create-event-drinks-pair.dto';
import { UpdateEventDrinksPairDto } from './dto/update-event-drinks-pair.dto';

@Controller('event-drinks-pairs')
export class EventDrinksPairsController {
  constructor(private readonly eventDrinksPairsService: EventDrinksPairsService) {}

  @Post()
  create(@Body() createEventDrinksPairDto: CreateEventDrinksPairDto) {
    return this.eventDrinksPairsService.create(createEventDrinksPairDto);
  }

  @Get()
  findAll() {
    return this.eventDrinksPairsService.findAll();
  }

  @Get('/event/:id')
  findAllyEvent(@Param('id') id : number) {
    return this.eventDrinksPairsService.findAllByEvent(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventDrinksPairsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDrinksPairDto: UpdateEventDrinksPairDto) {
    return this.eventDrinksPairsService.update(id, updateEventDrinksPairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventDrinksPairsService.remove(id);
  } 

  @Get('event/:eventId')
  getAllByEvent(@Param('eventId') eventId: number) {
    return this.eventDrinksPairsService.findAllByEvent(eventId)
  }
}
