import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { LogInUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signupLocal(body: CreateUserDTO) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (userFound) throw new BadRequestException('email already in use');
    const hashedPassword = await hash(body.password, 10);
    const user = await this.userService.create(
      body.firstName,
      body.lastName,
      body.email,
      hashedPassword,
      body.phoneNumber,
    );
    const accessToken = await this.signAccessToken(user.id);
    const refreshToken = await this.signRefreshToken(user.id);
    await this.updateHashedRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async loginLocal(body: LogInUserDto) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (!userFound) throw new NotFoundException('user not found');
    const isPasswordMatches = await compare(body.password, userFound.password);
    if (!isPasswordMatches)
      throw new UnauthorizedException('password is incorrect');
    const accessToken = await this.signAccessToken(userFound.id);
    const refreshToken = await this.signRefreshToken(userFound.id);
    await this.updateHashedRefreshToken(userFound.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('user not found');

    const isRefreshTokenMatches = await compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenMatches)
      throw new ForbiddenException("refresh token doesn't match");

    const accessToken = await this.signRefreshToken(user.id);
    return accessToken;
  }

  async logout(id: number) {
    await this.nullHashedRefreshToken(id);
  }

  async signAccessToken(userId: number) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: parseInt(this.configService.get('JWT_ACCESS_TOKEN_EXP')),
      },
    );
    return accessToken;
  }

  async signRefreshToken(userId: number) {
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXP')),
      },
    );
    return refreshToken;
  }

  async updateHashedRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.userService.update(id, { hashedRefreshToken });
  }

  async nullHashedRefreshToken(id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('user not found');
    await this.userService.update(id, {
      hashedRefreshToken: null,
    });
  }
}
