import { Module } from '@nestjs/common';
import { EventDrinksPairsService } from './event-drinks-pairs.service';
import { EventDrinksPairsController } from './event-drinks-pairs.controller';

@Module({
  controllers: [EventDrinksPairsController],
  providers: [EventDrinksPairsService],
})
export class EventDrinksPairsModule {}
