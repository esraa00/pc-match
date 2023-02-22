import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  async signupLocal(@Body() body: CreateUserDTO) {
    return await this.authService.signupLocal(body);
  }

  @Post('/local/login')
  async loginLocal(@Body() body: LogInUserDto) {
    return await this.authService.loginLocal(body);
  }
}
