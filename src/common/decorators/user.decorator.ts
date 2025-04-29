import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserRequest } from '../guard/authentication/authentication.guard';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IUserRequest>();
    return request.user;
  },
);
