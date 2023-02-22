import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  async signupLocal(@Body() body: CreateUserDTO) {
    const tokens = await this.authService.signupLocal(body);
    return tokens;
  }
}
