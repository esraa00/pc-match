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
import { LogInUserDto } from './dto/login-user.dto';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private customJwtService: CustomJwtService,
  ) {}

  async signupLocal(body: CreateUserDTO) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (userFound) throw new BadRequestException('email already in use');
    const role = await this.roleService.findOneByName(body.role);
    if (!role) throw new BadRequestException('role is not valid');

    const hashedPassword = await hash(body.password, 10);
    const user = await this.userService.create(
      body.firstName,
      body.lastName,
      body.email,
      hashedPassword,
      body.phoneNumber,
      role,
    );
    const accessToken = this.customJwtService.signAccessToken(user.id);
    const refreshToken = this.customJwtService.signRefreshToken(user.id);
    await this.updateHashedRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async loginLocal(body: LogInUserDto) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (!userFound) throw new NotFoundException('user not found');

    if (!userFound.isEmailConfirmed)
      throw new UnauthorizedException('please confirm your email to login');

    const isPasswordMatches = await compare(body.password, userFound.password);
    if (!isPasswordMatches)
      throw new UnauthorizedException('password is incorrect');
    const accessToken = this.customJwtService.signAccessToken(userFound.id);
    const refreshToken = this.customJwtService.signRefreshToken(userFound.id);
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

    const accessToken = this.customJwtService.signRefreshToken(user.id);
    return accessToken;
  }

  async logout(id: number) {
    await this.nullHashedRefreshToken(id);
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
