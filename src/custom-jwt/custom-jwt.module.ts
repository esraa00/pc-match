import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtService } from './custom-jwt.service';

@Module({
  providers: [CustomJwtService],
  imports: [JwtModule.register({})],
  exports: [CustomJwtService],
})
export class CustomJwtModule {}
