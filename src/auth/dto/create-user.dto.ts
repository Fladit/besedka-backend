import { IsDate, IsDateString, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({
    minLength: 3,
    maxLength: 16,
    example: "Fl4d1t"
  })
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 64,
    example: "sd123D123"
  })
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;

  @ApiProperty({example: "admin@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 16,
    example: "Eugene"
  })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  firstName: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 32,
    example: "Zatsarin"
  })
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;

  @ApiProperty({example: "1900-12-01"})
  @IsDateString()
  birthDay: Date;
}
