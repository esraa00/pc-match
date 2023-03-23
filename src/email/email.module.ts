import { Module } from '@nestjs/common';
import { CustomJwtModule } from 'src/custom-jwt/custom-jwt.module';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [EmailService, EmailConfirmationService],
  imports: [CustomJwtModule, UserModule],
  exports: [EmailConfirmationService],
  controllers: [EmailController],
})
export class EmailModule {}
