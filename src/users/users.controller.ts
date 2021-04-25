import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "./entities/role.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('api/v1/users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Get('init')
  async initRoles(): Promise<Role[]> {
    return this.usersService.initRolesAndStatuses()
  }



}
