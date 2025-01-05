import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create() {
    return this.eventService.create();
  }
  
  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @Get('/active')
  findActive() {
    return this.eventService.getActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  // @Get(':id/activate')
  // activate(@Param('id') id: string) {
  //   return this.eventService.activate(+id);
  // }

  // @Get(':id/stopEvent')
  // stopEvent(@Param('id') id: string) {
  //   return this.eventService.stop(+id);
  // }
}
