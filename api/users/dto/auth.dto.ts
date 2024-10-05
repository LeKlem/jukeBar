import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginAuthDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}