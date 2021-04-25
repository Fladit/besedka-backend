import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class LoginInputUserDto extends PickType(CreateUserDto, ['username', 'password'] as const) {}
