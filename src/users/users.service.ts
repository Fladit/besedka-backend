import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { MaritalStatus } from "./entities/marital-status.entity";
import { Photo } from "./entities/photo.entity";
import { Roles } from "../../assets/users/roles-enum";
import { MaritalStatuses } from "../../assets/users/marital-status-enum";
import { validate } from "class-validator";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(MaritalStatus) private maritalStatusRepository: Repository<MaritalStatus>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) {}

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

  async findUserById(id: number) {
    return this.userRepository.findOne(id)
  }


  //used for initialisation roles and marital-statuses
  async initRolesAndStatuses(): Promise<any> {
    const userRole = new Role()
    userRole.name = Roles[Roles.User]
    const adminRole = new Role()
    adminRole.name = Roles[Roles.Admin]
    await this.roleRepository.save([userRole, adminRole])


    const searchStatus = new MaritalStatus()
    searchStatus.name = MaritalStatuses[MaritalStatuses.Search]
    const marriedStatus = new MaritalStatus()
    marriedStatus.name = MaritalStatuses[MaritalStatuses.Married]
    const meetStatus = new MaritalStatus()
    meetStatus.name = MaritalStatuses[MaritalStatuses.Meet]
    const notMarriedStatus = new MaritalStatus()
    notMarriedStatus.name = MaritalStatuses[MaritalStatuses.Not_Married]
    await this.maritalStatusRepository.save([searchStatus, marriedStatus, meetStatus, notMarriedStatus])

    return [[userRole, adminRole], [searchStatus, marriedStatus, meetStatus, notMarriedStatus]]
  }
}
