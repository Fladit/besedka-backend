import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { MaritalStatus } from "./entities/marital_status.entity";
import { Photo } from "./entities/photo.entity";
import { Roles } from "../../assets/roles_enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(MaritalStatus)
    private maritalStatusRepository: Repository<MaritalStatus>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    return `Creation of ${createUserDto.username}`
  }

  // получить ключ по значению
  async initRoles(): Promise<string> {
    const userRole = new Role()
    userRole.code = Roles.User
    userRole.name = Roles[Roles.User]


    return "Done"
  }
}
