import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async create() {
    const newEvent = this.eventRepository.create();
    return await this.eventRepository.save(newEvent);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number) : Promise<Event> {
    return this.eventRepository.findOneBy({id});
  }
  getActive(): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { active: 'ACTIVE' },
      order: { id: 'DESC' },
    });
  }  
  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.eventRepository.delete(id);
  }

  async activate(id: number) : Promise<Event> {
    const event = await this.eventRepository.findOneBy({id});
    event.active = 'ACTIVE';
    return await this.eventRepository.save(event);
  }

  async stop(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({id});
    event.active = 'ENDED';
    return await this.eventRepository.save(event);
  }
}
