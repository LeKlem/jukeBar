import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController, LoginController, UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AdminController, LoginController],
  providers: [UsersService]
})
export class UsersModule { }
