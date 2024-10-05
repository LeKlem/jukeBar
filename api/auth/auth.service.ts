import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneById(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.first_name, sub: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}