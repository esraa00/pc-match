import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: 'userId' | 'iat' | 'exp', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return data ? request.user?.[data] : request.user;
  },
);
