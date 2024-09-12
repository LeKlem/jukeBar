import { Module } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { DrinkController } from './drink.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from './entities/drink.entity';

@Module({
  controllers: [DrinkController],
  providers: [DrinkService],
  imports: [TypeOrmModule.forFeature([Drink])],
})
export class DrinkModule {}
  