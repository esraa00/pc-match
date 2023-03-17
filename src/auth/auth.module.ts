import { Module } from '@nestjs/common';
import { CustomJwtModule } from 'src/custom-jwt/custom-jwt.module';
import { EmailModule } from 'src/email/email.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, refreshTokenStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, refreshTokenStrategy, AccessTokenStrategy],
  imports: [UserModule, CustomJwtModule, EmailModule, RoleModule],
})
export class AuthModule {}
