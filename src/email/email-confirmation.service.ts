import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { CustomJwtService } from 'src/custom-jwt/custom-jwt.service';
import { UserService } from 'src/user/user.service';
import { ConfirmEmailDTO } from './dto/confirmEmail.dto';
import { EmailService } from './email.service';
import VerificationEmailTokenPayload from './interfaces/verificationEmailTokenPayload.interface';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly customJwtService: CustomJwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  async confirm(confirmEmailDTO: ConfirmEmailDTO) {
    const payload = this.decodeConfirmationToken(confirmEmailDTO.token);

    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) throw new NotFoundException('fuck you esraa');
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(payload.email);
  }

  sendVerificationLink(email: string) {
    const payload: VerificationEmailTokenPayload = { email };
    const token = this.customJwtService.signVerificationEmailToken(payload);
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;
    const message = `Welcome to the application. To confirm the email address, click here: ${url}`;
    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text: message,
    });
  }

  async resendConfirmationLink(id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException('user not found');
    if (user.isEmailConfirmed)
      throw new BadRequestException('email is already verified');
    this.sendVerificationLink(user.email);
  }

  decodeConfirmationToken(token: string) {
    const payload = this.customJwtService.verify(
      token,
      'JWT_VERIFICATION_TOKEN_SECRET',
    );
    return payload;
  }
}
