import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginInputUserDto } from "./dto/login-input-user.dto";
import { LoginOutputUserDto } from "./dto/login-output-user.dto";

@ApiTags('api/v1/auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginInputUserDto): Promise<LoginOutputUserDto> {
    return this.authService.login(loginUserDto)
  }

  @Post('/authentication')
  async authentication() {

  }

  @Post('/registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<LoginOutputUserDto> {
    return this.authService.registration(createUserDto)
  }
}
