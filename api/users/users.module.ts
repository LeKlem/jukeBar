import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController, LoginController, UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AdminController, LoginController],
  providers: [UsersService, JwtService]
})
export class UsersModule { }
