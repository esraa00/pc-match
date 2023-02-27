import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
export function UseAccessTokenGuard() {
  return UseGuards(AccessTokenGuard);
}

export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
