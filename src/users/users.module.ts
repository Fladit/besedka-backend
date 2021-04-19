import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { MaritalStatus } from "./entities/marital-status.entity";
import { Photo } from "./entities/photo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, MaritalStatus, Photo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
