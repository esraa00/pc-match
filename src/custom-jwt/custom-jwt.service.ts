import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import VerificationEmailTokenPayload from 'src/email/interfaces/verificationEmailTokenPayload.interface';
import AccessTokenPayload from './interfaces/access-token-payload.interface';
import RefreshTokenPayload from './interfaces/refresh-token-payload.interface';

@Injectable()
export class CustomJwtService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  signAccessToken(accessTokenPayload: AccessTokenPayload) {
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: parseInt(this.configService.get('JWT_ACCESS_TOKEN_EXP')),
    });
    return accessToken;
  }

  signRefreshToken(refreshTokenPayload: RefreshTokenPayload) {
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXP')),
    });
    return refreshToken;
  }

  signVerificationEmailToken(
    verificationEmailTokenPayload: VerificationEmailTokenPayload,
  ) {
    const verificationToken = this.jwtService.sign(
      verificationEmailTokenPayload,
      {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: parseInt(
          this.configService.get('JWT_VERIFICATION_TOKEN_EXP'),
        ),
      },
    );
    return verificationToken;
  }

  verify(token: string, secret: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get(secret),
    });
    return payload;
  }
}
