import { HttpException, HttpStatus } from "@nestjs/common";
import { TokenStructure } from "../dto/login.input";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "../constants";

let jwtService = new JwtService({ secret: jwtConstants.secret });

export async function VerifyToken(token: string): Promise<boolean> {
  try {
    const verified: any = jwtService.verify(token);
    return verified != null;
  } catch (error) {
    throw new HttpException({ message: 'Token is expired or invalid' }, HttpStatus.UNAUTHORIZED);
  }
}

export async function DecodeToken(token: string): Promise<TokenStructure> {
  try {
    return jwtService.decode(token) as TokenStructure;
  } catch (error) {
    throw new HttpException({ message: 'Error decoding token' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

