import { IsDate, IsDateString, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(16)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;

  @IsDateString()
  birthDay: Date;
}
