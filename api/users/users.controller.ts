import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { UUID } from './dto/params-user.dto';
import { LoginAuthDto } from './dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param() id: UUID) {
    return this.usersService.findOneById(id.id);
  }

  @Patch(':id')
  async update(@Param() id: UUID, @Body() updatePasswordUserDto: UpdatePasswordUserDto) {
    return this.usersService.updatePassword(id.id, updatePasswordUserDto);
  }

  @Delete(':id')
  async remove(@Param() id: UUID) {
    return this.usersService.remove(id.id);
  }
}

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

}

@Controller('auth')
export class LoginController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async login(@Body() loginData: LoginAuthDto) {
    return this.usersService.login(loginData);
  }

}