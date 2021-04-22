import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { Role } from "./entities/role.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('api/v1/users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Get('init')
  async initRoles(): Promise<Role[]> {
    return this.usersService.initRolesAndStatuses()
  }



}
