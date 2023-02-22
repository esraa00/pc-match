import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
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
    const tokens = await this.signToken(user.id);
    await this.updateHashedRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async loginLocal(body: LogInUserDto) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (!userFound) throw new NotFoundException('user not found');
    const isPasswordMatches = await compare(body.password, userFound.password);
    if (!isPasswordMatches)
      throw new UnauthorizedException('password is incorrect');
    const tokens = await this.signToken(userFound.id);
    await this.updateHashedRefreshToken(userFound.id, tokens.refreshToken);
    return tokens;
  }

  async signToken(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        { userId },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.userService.update(id, { hashedRefreshToken });
  }
}
