import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDrinksPairDto } from './dto/create-event-drinks-pair.dto';
import { UpdateEventDrinksPairDto } from './dto/update-event-drinks-pair.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDrinksPair } from './entities/event-drinks-pair.entity';
import { DeleteResult, MoreThan, Repository } from 'typeorm';
import { Drink } from 'drink/entities/drink.entity';
import { Event } from 'event/entities/event.entity';
import { DeepPartial } from 'typeorm';
import { EVENT_TTL } from "../const/const";

@Injectable()
export class EventDrinksPairsService {
  constructor(
    @InjectRepository(EventDrinksPair)
    private pairsRepository: Repository<EventDrinksPair>,
    @InjectRepository(Drink)
    private drinkRepository: Repository<Drink>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDrinksPairDto: CreateEventDrinksPairDto) {
    console.log(EVENT_TTL);
    const drinkOne = await this.drinkRepository.findOneBy({id: createEventDrinksPairDto.idDrink_1});
    const drinkTwo = await this.drinkRepository.findOneBy({id: createEventDrinksPairDto.idDrink_2});
    if(!drinkOne || !drinkTwo){
      throw new HttpException(
        { message: 'One of the specified drink does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const activeEvent = await this.eventRepository.findOne({
          where: { 
            createdAt: MoreThan(new Date(Date.now() - EVENT_TTL)),
            active : true
          },
          order: { id: 'DESC' },
        });

    if(!activeEvent){
      throw new HttpException(
        { message: 'Impossible to create, there is no currently active event' },
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const existingPair = await this.pairsRepository.findOne({
      where: [
        { idEvent: activeEvent, idDrink_1: drinkOne },
        { idEvent: activeEvent, idDrink_2: drinkOne },
        { idEvent: activeEvent, idDrink_1: drinkTwo },
        { idEvent: activeEvent, idDrink_2: drinkTwo },
      ],
    });
    
    if (existingPair) {
      throw new HttpException(
        { message: 'One of the drinks is already selected for this event' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPair = this.pairsRepository.create({
      ...createEventDrinksPairDto,
      idEvent: activeEvent,
      idDrink_1: drinkOne,
      idDrink_2: drinkTwo,
    });
  
    return await this.pairsRepository.save(newPair);
  }

  findAll(): Promise<EventDrinksPair[]> {
    return this.pairsRepository.find({
      relations: ['idEvent', 'idDrink_1', 'idDrink_2'],
    });
  }
  
  findOne(id: number) {
    return this.pairsRepository.findOne({
      where: { id },
      relations: ['idEvent', 'idDrink_1', 'idDrink_2'],
    });
  }

  async update(id: number, updateEventDrinksPairDto: UpdateEventDrinksPairDto) {
    const pair = await this.pairsRepository.findOne({
      where: { id },
      relations: ['idEvent', 'idDrink_1', 'idDrink_2'],
    });
  
    if (!pair) {
      throw new HttpException({ message: 'Pair not found.' }, HttpStatus.NOT_FOUND);
    }
    if (updateEventDrinksPairDto.idDrink_1) {
      const drinkOne = await this.drinkRepository.findOneBy({ id: updateEventDrinksPairDto.idDrink_1 });
      if (!drinkOne) {
        throw new HttpException({ message: 'Drink 1 not found.' }, HttpStatus.BAD_REQUEST);
      }
      pair.idDrink_1 = drinkOne;
    }
  
    if (updateEventDrinksPairDto.idDrink_2) {
      const drinkTwo = await this.drinkRepository.findOneBy({ id: updateEventDrinksPairDto.idDrink_2 });
      if (!drinkTwo) {
        throw new HttpException({ message: 'Drink 2 not found.' }, HttpStatus.BAD_REQUEST);
      }
      pair.idDrink_2 = drinkTwo;
    }
    
    const updatedPair = this.pairsRepository.merge(pair, updateEventDrinksPairDto as DeepPartial<EventDrinksPair>);
    return this.pairsRepository.save(updatedPair);
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.pairsRepository.delete(id);
  }
  findAllByEvent(id: number) : Promise<EventDrinksPair[]> {
    return this.pairsRepository.find({
      where : {idEvent : {id}},
      relations: ['idEvent', 'idDrink_1', 'idDrink_2'],

    });
  }
}
