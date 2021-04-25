import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginInputUserDto } from "./dto/login-input-user.dto";
import { LoginOutputUserDto } from "./dto/login-output-user.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async isUserExist(username: string, email: string) {
    return !! await this.userRepository.findOne({
      where: [
        { username },
        { email },
      ]
    })
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    if (! await this.isUserExist(createUserDto.username, createUserDto.email)) {
      const user = new User()
      for (const attribute in createUserDto) {
        user[attribute] = createUserDto[attribute]
      }
      await this.userRepository.save(user)
      return {
        message: "User is successfully created!",
        data: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
    }
    return {message: "User is already exist"}
  }

  async login(loginUserDto: LoginInputUserDto): Promise<LoginOutputUserDto> {
    const user: User = await this.userRepository.findOne({username: loginUserDto.username, password: loginUserDto.password})
    if (user) {

    }
    return {message: "Неверный логин или пароль"}
  }

  encrypt(payload) {

  }
}
