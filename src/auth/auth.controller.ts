import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GetCookies, GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard, UseRefreshTokenGuard } from 'src/guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('local/signup')
  // @UseInterceptors(new SetCookieInterceptor(['accessToken', 'refreshToken'], [{}, {}]))
  async signupLocal(
    @Body() body: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signupLocal(
      body,
    );
    res.cookie('accessToken', accessToken, {
      maxAge: +this.configService.get('COOKIE_ACCESS_TOKEN_EXP'),
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: +this.configService.get('COOKIE_REFRESH_TOKEN_EXP'),
    });
  }

  @Post('local/login')
  async loginLocal(
    @Body() body: LogInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.loginLocal(
      body,
    );
    res.cookie('accessToken', accessToken, {
      maxAge: +this.configService.get('COOKIE_ACCESS_TOKEN_EXP'),
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: +this.configService.get('COOKIE_REFRESH_TOKEN_EXP'),
    });
  }

  @UseAccessTokenGuard()
  @Post('logout')
  async logout(
    @GetCurrentUser('userId') userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.cookie('accessToken', '');
    res.cookie('refreshToken', '');
  }

  @UseRefreshTokenGuard()
  @Post('refresh')
  async refreshToken(
    @GetCurrentUser('userId') userId: number,
    @GetCookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.refreshToken(
      userId,
      refreshToken,
    );
    res.cookie('accessToken', accessToken, {
      maxAge: +this.configService.get('COOKIE_REFRESH_TOKEN_EXP'),
    });
  }
}
