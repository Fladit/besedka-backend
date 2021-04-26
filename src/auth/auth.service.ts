import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginInputUserDto } from "./dto/login-input-user.dto";
import { LoginOutputUserDto } from "./dto/login-output-user.dto";
import { EncryptService } from "../encrypt/encrypt.service";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../users/entities/role.entity";
import { Roles } from "../../assets/users/roles-enum";

enum TokenLifeTime {
  ACCESS_TOKEN = "1h",
  REFRESH_TOKEN = "30d"
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Role) private roleRepository: Repository<Role>,
              private encryptService: EncryptService, private jwtService: JwtService) {
  }

  async isUserExist(username: string, email: string): Promise<boolean> {
    return !! await this.userRepository.findOne({
      where: [
        { username },
        { email },
      ]
    })
  }

  async registration(createUserDto: CreateUserDto): Promise<LoginOutputUserDto> {
    if (! await this.isUserExist(createUserDto.username, createUserDto.email)) {
      let user = new User()
      for (const attribute in createUserDto) {
        user[attribute] = createUserDto[attribute]
      }
      user.password = await this.encryptService.encryptData(createUserDto.password)
      user.role = await this.roleRepository.findOne(Roles.User)
      user = await this.userRepository.save(user)
      return this.createJwtTokens(user)
    }
    throw new HttpException({message: "User is already exist"}, 400)
  }

  async login(loginUserDto: LoginInputUserDto): Promise<LoginOutputUserDto> {
    const user: User = await this.userRepository.findOne({username: loginUserDto.username},
      {relations: ["avatar", "maritalStatus", "role"]})
    if (user && await this.encryptService.compareData(loginUserDto.password, user.password)) {
      return this.createJwtTokens(user)
    }
    throw new HttpException({message: "Неверный логин или пароль"}, 400)
  }

  createJwtTokens(user: User): LoginOutputUserDto {
    const {password, photos, ...userInfo} = user
    const accessToken = this.jwtService.sign(userInfo, { expiresIn: TokenLifeTime.ACCESS_TOKEN})
    const refreshToken = this.jwtService.sign(userInfo, { expiresIn: TokenLifeTime.REFRESH_TOKEN})
    return {accessToken, refreshToken}
  }
}
