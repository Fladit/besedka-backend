import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('api/v1')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
