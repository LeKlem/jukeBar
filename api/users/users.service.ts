const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(loginData: LoginAuthDto) {
    const user = await this.usersRepository.findOne({ where: { email: loginData.email }, select: ['id', 'password', 'role'] });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
  
    const passwordMatch = await argon2.verify(user.password, loginData.password);
    if (!passwordMatch)
      throw new HttpException({ message: 'Invalid password.' }, HttpStatus.BAD_REQUEST);
  
    const tokenData = {
      id: user.id,
      role: user.role,
    };
  
    // Generate JWT token
    const token = jwt.sign(tokenData, jwtConstants.secret, { expiresIn: '15h' });
  
    return { token }; // Return the token
  }
  

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (user)
      throw new HttpException({ message: 'Email already registered.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      }
      return await this.usersRepository.save(this.usersRepository.create(userData));
    }
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (user)
      throw new HttpException({ message: 'Email already registered.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
        role: 'ADMIN',
      }
      return await this.usersRepository.save(this.usersRepository.create(userData));
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else
      return user;
  }

  async updatePassword(id: string, updatePasswordUserDto: UpdatePasswordUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        password: await argon2.hash(updatePasswordUserDto.password),
      }
      return await this.usersRepository.update({ id }, userData);
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else
      return await this.usersRepository.delete({ id });
  }

  async isValid(token : string){
    try{
      const res =  await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      if(res.id !== undefined){
        return true;
      }
      return false;
    }catch{
      return false;
    }
    
    return 
  }
}