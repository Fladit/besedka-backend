import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { EncryptModule } from "../encrypt/encrypt.module";
import { JwtModule } from "@nestjs/jwt";
import { Role } from "../users/entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), EncryptModule, JwtModule.register({secret: `${process.env.JWT_SECRET_PASSWORD}`})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
