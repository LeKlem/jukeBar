import { Module } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { PriceHistoryController } from './price-history.controller';
import { EventDrinksPair } from '../event-drinks-pairs/entities/event-drinks-pair.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Event } from '../event/entities/event.entity';

@Module({
  controllers: [PriceHistoryController],
  providers: [PriceHistoryService],
  imports: [TypeOrmModule.forFeature([Event, PriceHistory, EventDrinksPair])],
})
export class PriceHistoryModule {}
