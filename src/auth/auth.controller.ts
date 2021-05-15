import { BadRequestException, Body, Controller, HttpException, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginInputUserDto } from "./dto/login-input-user.dto";
import { LoginOutputUserDto } from "./dto/login-output-user.dto";

@ApiTags('api/v1/auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: "Authorize the user"})
  @Post('/login')
  async login(@Body() loginUserDto: LoginInputUserDto): Promise<LoginOutputUserDto> {
    return this.authService.login(loginUserDto)
  }

  @ApiOperation({summary: "Authenticate the user"})
  @Post('/authentication')
  async authentication() {

  }

  @ApiOperation({summary: "Register a new user"})
  @Post('/registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<LoginOutputUserDto> {
    return this.authService.registration(createUserDto)
  }

  @ApiOperation({summary: "Check user existence by username or email"})
  @Post('/existence')
  async checkUserExistence(@Body() body) {
    if (body.hasOwnProperty("username"))
      return this.authService.isUserExist(body.username, "")
    else if (body.hasOwnProperty("email"))
      return this.authService.isUserExist("", body.email)
    else throw new BadRequestException()
  }
}
