import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { PriceHistory } from './entities/price-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDrinksPair } from 'event-drinks-pairs/entities/event-drinks-pair.entity';
import { Event } from '../event/entities/event.entity';

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

  async buy(id : number, isDrinkOne: Boolean) {
    const currentEvent = await this.eventRepository.findOne({
      where: { active: true },
      order: { id: 'DESC' },
    });

    const pairId = await this.pairRepository.findOne({
      where: [
        { id, idEvent: { id: currentEvent.id } },
      ],
    });


    //init if not done before
    // this.init(id);

    //Get old price, increase it and save it
    var oldPrice = await this.priceRepository.findOne({
      where: { pairId : id },
      order: { id: 'DESC' },
    });
    console.log(pairId);
    if(isDrinkOne){
      oldPrice.price_drink_1 += Number(pairId.price_inc_1);
      oldPrice.price_drink_2 -= Number(pairId.price_sub_2);
    }
    else{
      oldPrice.price_drink_1 -= Number(pairId.price_sub_1);
      oldPrice.price_drink_2 += Number(pairId.price_inc_2)  ;
    }


    const newPrice = this.priceRepository.create(oldPrice);

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

  update(id: number, updatePriceHistoryDto: UpdatePriceHistoryDto) {
    return `This action updates a #${id} priceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceHistory`;
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