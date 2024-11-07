import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { PriceHistory } from './entities/price-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private priceRepository: Repository<PriceHistory>,
  ) {}

  async create(createPriceHistoryDto: CreatePriceHistoryDto) {
    const newDrink = this.priceRepository.create(createPriceHistoryDto);
      return await this.priceRepository.save(newDrink);
  }
  

  findAll() {
    return `This action returns all priceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} priceHistory`;
  }

  update(id: number, updatePriceHistoryDto: UpdatePriceHistoryDto) {
    return `This action updates a #${id} priceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceHistory`;
  }
}
