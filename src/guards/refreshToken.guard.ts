import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
export function UseRefreshTokenGuard() {
  return UseGuards(RefreshTokenGuard);
}

export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
