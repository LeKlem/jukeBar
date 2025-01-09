import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrinkModule } from '../drink/drink.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Drink } from 'drink/entities/drink.entity';
import { Event } from 'event/entities/event.entity';
import { EventModule } from '../event/event.module';
import { AuthGuard } from '../users/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { User } from 'users/entities/user.entity';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EventDrinksPair } from 'event-drinks-pairs/entities/event-drinks-pair.entity';
import { EventDrinksPairsModule } from 'event-drinks-pairs//event-drinks-pairs.module';
import { PriceHistoryModule } from '../price-history/price-history.module';
import { PriceHistory } from '../price-history/entities/price-history.entity';
import { WebSocketService } from 'price-history/websockets/websocket.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'jukebar',
      entities: [Event, Drink, User, EventDrinksPair, PriceHistory],
      synchronize: true,
    }),
  DrinkModule, EventModule, UsersModule, EventDrinksPairsModule, PriceHistoryModule, JwtModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, 
    // }
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}