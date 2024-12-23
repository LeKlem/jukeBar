import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Post('/buy/:id')
  buy(@Param('id') id: string, @Body() isDrinkOne: Boolean) {
    return this.priceHistoryService.buy(+id, isDrinkOne);
  }

  @Get()
  findAll() {
    return this.priceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceHistoryService.remove(+id);
  }
  @Post('/init/:id')
  init(@Param('id') id: string) {
    return this.priceHistoryService.init(+id);
  }
}
