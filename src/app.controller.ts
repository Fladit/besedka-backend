import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('api/v1')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: "Return hello world for testing connection with server"})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
