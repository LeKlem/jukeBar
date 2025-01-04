import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThan, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import "../const/const";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async create() {
    const newEvent = this.eventRepository.create();
    //make sure that all previous event are inactive
    const activeEvent = await this.getActive();
    console.log(activeEvent);
    if(activeEvent){
      throw new HttpException({ message: 'Previous event still active, please close it manually if you want to create a new one' }, HttpStatus.CONFLICT);
    }
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

      where: { 
        createdAt: MoreThan(new Date(Date.now() - EVENT_TTL)),
        active : true
      },
      order: { id: 'DESC' },
    });
  }  
  async update(id: number, updateEventDto: UpdateEventDto) {
    const currentEvent = await this.eventRepository.findOneBy({id});
    currentEvent.active = !updateEventDto.closeEvent;
    return this.eventRepository.save(currentEvent);
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.eventRepository.delete(id);
  }
//see if necessary
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
