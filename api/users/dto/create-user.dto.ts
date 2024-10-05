import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}
