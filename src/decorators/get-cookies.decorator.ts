import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCookies = createParamDecorator(
  (data: 'accessToken' | 'refreshToken', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
