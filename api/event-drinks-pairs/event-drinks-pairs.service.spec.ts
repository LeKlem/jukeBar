import { Test, TestingModule } from '@nestjs/testing';
import { EventDrinksPairsService } from './event-drinks-pairs.service';

describe('EventDrinksPairsService', () => {
  let service: EventDrinksPairsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventDrinksPairsService],
    }).compile();

    service = module.get<EventDrinksPairsService>(EventDrinksPairsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
