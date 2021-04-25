import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Role } from "./users/entities/role.entity";
import { MaritalStatus } from "./users/entities/marital-status.entity";
import { Photo } from "./users/entities/photo.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'besedka',
      password: '12345d',
      database: 'besedka_social_network',
      entities: [User, Role, MaritalStatus, Photo],
      synchronize: true,
    }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
