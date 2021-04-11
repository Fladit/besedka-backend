import { Injectable, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    return `Creation of ${createUserDto.username}`
  }
}
