import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsJWT, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

@ObjectType()
export class TokenStructure {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
