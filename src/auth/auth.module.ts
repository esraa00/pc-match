import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, refreshTokenStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, refreshTokenStrategy, AccessTokenStrategy],
  imports: [UserModule, JwtModule.register({})],
})
export class AuthModule {}
