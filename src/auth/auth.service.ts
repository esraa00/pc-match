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
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private customJwtService: CustomJwtService,
    private roleService: RoleService,
  ) {}

  async signupLocal(body: CreateUserDTO) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (userFound) throw new BadRequestException('email already in use');
    const hashedPassword = await hash(body.password, 10);

    const customerRole = await this.roleService.findOneByName('CUSTOMER');
    if (!customerRole)
      throw new NotFoundException("customer role doesn't exist anymore");

    const user = await this.userService.create(
      body.firstName,
      body.lastName,
      body.email,
      hashedPassword,
      body.phoneNumber,
      customerRole,
    );
    const accessToken = this.customJwtService.signAccessToken({
      userId: user.id,
    });
    const refreshToken = this.customJwtService.signRefreshToken({
      userId: user.id,
    });
    await this.updateHashedRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async loginLocal(body: LogInUserDto) {
    const userFound = await this.userService.findOneByEmail(body.email);
    if (!userFound) throw new NotFoundException('user not found');

    const isPasswordMatches = await compare(body.password, userFound.password);
    if (!isPasswordMatches)
      throw new UnauthorizedException('password is incorrect');
    console.log(userFound);
    const accessToken = this.customJwtService.signAccessToken({
      userId: userFound.id,
    });
    const refreshToken = this.customJwtService.signRefreshToken({
      userId: userFound.id,
    });
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

    const accessToken = this.customJwtService.signRefreshToken({
      userId: user.id,
    });
    return accessToken;
  }

  async logout(id: number) {
    await this.nullHashedRefreshToken(id);
  }

  //TODO implement forget password
  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    const user = await this.userService.findOneByEmail(forgetPasswordDTO.email);
    if (!user)
      throw new NotFoundException("there's no user with the provided email");
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
