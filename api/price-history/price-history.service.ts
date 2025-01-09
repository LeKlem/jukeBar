import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PriceHistory } from './entities/price-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThan, Repository } from 'typeorm';
import { EventDrinksPair } from 'event-drinks-pairs/entities/event-drinks-pair.entity';
import { Event } from '../event/entities/event.entity';
import { findManyPrices } from './dto/find-many-prices.dto';
import { EVENT_TTL } from 'const/const';

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
    if(!currentEvent){
      throw new HttpException({ message: 'Error : no active event at the moment' }, HttpStatus.BAD_REQUEST);
    }

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

  async findOne(id: number) {
    console.log('here');
    const price = await this.priceRepository.findOne({
        where: { pairId: id },
        order: { id: 'DESC' },
    });
    if(!price){
      await this.init(id);
      const priceInit = await this.priceRepository.findOne({
        where: { pairId: id },
        order: { id: 'DESC' },
      });
      return priceInit;
    }
    return price;
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

  async findMany(findManyPrices : findManyPrices) {
    const ids = findManyPrices.ids;
    if (!ids || ids.length === 0) {
        throw new HttpException('No IDs provided.', HttpStatus.BAD_REQUEST);
    }

    const prices = await this.priceRepository
        .createQueryBuilder('price')
        .where('price.pairId IN (:...ids)', { ids })
        .andWhere((qb) => {
            const subQuery = qb
                .subQuery()
                .select('MAX(price.id)', 'maxId')
                .from(PriceHistory, 'price')
                .where('price.pairId IN (:...ids)', { ids })
                .groupBy('price.pairId')
                .getQuery();
            return `price.id IN (${subQuery})`;
        })
        .getMany();

    // Optionally initialize missing prices for pairs not found
    const foundPairIds = new Set(prices.map((price) => price.pairId));
    const missingPairIds = ids.filter((id) => !foundPairIds.has(id));

    if (missingPairIds.length > 0) {
        await Promise.all(missingPairIds.map((id) => this.init(id)));
        const newPrices = await this.priceRepository
        .createQueryBuilder('price')
        .where('price.pairId IN (:...ids)', { missingPairIds })
        .andWhere((qb) => {
            const subQuery = qb
                .subQuery()
                .select('MAX(price.id)', 'maxId')
                .from(PriceHistory, 'price')
                .where('price.pairId IN (:...ids)', { missingPairIds })
                .groupBy('price.pairId')
                .getQuery();
            return `price.id IN (${subQuery})`;
        })
        .getMany();
        prices.push(...newPrices);
    }

    return prices;
  }
}
