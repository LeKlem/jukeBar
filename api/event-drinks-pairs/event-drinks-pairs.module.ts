import { Module } from '@nestjs/common';
import { EventDrinksPairsService } from './event-drinks-pairs.service';
import { EventDrinksPairsController } from './event-drinks-pairs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDrinksPair } from './entities/event-drinks-pair.entity';
import { Drink } from 'drink/entities/drink.entity';
import { Event } from 'event/entities/event.entity';


@Module({
  controllers: [EventDrinksPairsController],
  providers: [EventDrinksPairsService],
  imports: [TypeOrmModule.forFeature([EventDrinksPair, Drink, Event])],
  exports : [EventDrinksPairsService]

})
export class EventDrinksPairsModule {}
