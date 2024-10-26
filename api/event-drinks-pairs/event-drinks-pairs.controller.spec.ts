import { Test, TestingModule } from '@nestjs/testing';
import { EventDrinksPairsController } from './event-drinks-pairs.controller';
import { EventDrinksPairsService } from './event-drinks-pairs.service';

describe('EventDrinksPairsController', () => {
  let controller: EventDrinksPairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventDrinksPairsController],
      providers: [EventDrinksPairsService],
    }).compile();

    controller = module.get<EventDrinksPairsController>(EventDrinksPairsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
