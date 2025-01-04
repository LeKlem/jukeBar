import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PriceHistory } from './entities/price-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThan, Repository } from 'typeorm';
import { EventDrinksPair } from 'event-drinks-pairs/entities/event-drinks-pair.entity';
import { Event } from '../event/entities/event.entity';
import { EVENT_TTL } from "../const/const";


@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private priceRepository: Repository<PriceHistory>,
    @InjectRepository(EventDrinksPair)
    private pairRepository: Repository<EventDrinksPair>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async buy(id : number, @Body() body: any) {
    const currentEvent = await this.eventRepository.findOne({
      where: { 
        createdAt: MoreThan(new Date(Date.now() - EVENT_TTL)),
        active : true 
      },
      order: { id: 'DESC' },
    });

    const pairId = await this.pairRepository.findOne({
      where: [
        { id, idEvent: { id: currentEvent.id } },
      ],
    });


    //Get old price, increase it and save it
    var oldPrice = await this.priceRepository.findOne({
      where: { pairId : id },
      order: { id: 'DESC' },
    });

    //init if not done before
    if(!oldPrice){
      await this.init(id);
      var oldPrice = await this.priceRepository.findOne({
        where: { pairId : id },
        order: { id: 'DESC' },
      });
    }
    let newPriceData = {
      pairId: oldPrice.pairId,
      price_drink_1: oldPrice.price_drink_1,
      price_drink_2: oldPrice.price_drink_2,
    };
    if (body.isDrinkOne) {
      newPriceData.price_drink_1 = Number(newPriceData.price_drink_1) + Number(pairId.price_inc_1);
      if(pairId.min_price_2 < Number(newPriceData.price_drink_2) - Number(pairId.price_sub_2)){
        newPriceData.price_drink_2 = Number(newPriceData.price_drink_2) - Number(pairId.price_sub_2);
      }else{
        newPriceData.price_drink_2 = pairId.min_price_2;
      }
    } else {
      if(pairId.min_price_1 < Number(newPriceData.price_drink_1) - Number(pairId.price_sub_1)){
        newPriceData.price_drink_1 = Number(newPriceData.price_drink_1) - Number(pairId.price_sub_1);
      }else{
        newPriceData.price_drink_1 = pairId.min_price_1;
      }
      newPriceData.price_drink_2 = Number(newPriceData.price_drink_2) + Number(pairId.price_inc_2);
    }    
    const newPrice = this.priceRepository.create(newPriceData);
    return await this.priceRepository.save(newPrice);
  }

  findAll() {
    return this.priceRepository.find();
  }

  findOne(id: number) {
    return this.priceRepository.findOne({
      where: { pairId: id },
      order: { id: 'DESC' },
    });
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.priceRepository.delete(id);
  }

  //insert the default data
  async init(id : number) {
    const pair = await this.pairRepository.findOne({
      where: { id },
      relations: ['idEvent', 'idDrink_1', 'idDrink_2'],
    });
    if(!pair){
      throw new HttpException({ message: 'Pair not found.' }, HttpStatus.NOT_FOUND);
    }
    const priceOne = pair.idDrink_1.price;
    const priceTwo = pair.idDrink_2.price;

    const priceInit = this.priceRepository.create();
    priceInit.pairId = id;
    priceInit.price_drink_1 = priceOne;
    priceInit.price_drink_2 = priceTwo;
    return this.priceRepository.save(priceInit);
 
  }
}
