import { IUserRequest } from './../authentication/authentication.guard';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roleKey } from 'src/common/decorators/roles.decorator';
import { RoleTypes } from 'src/DB/model/User.model';

@Injectable()
export class AuthorziationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest<IUserRequest>();

    if (!user) {
      return false;
    }

    const roles = this.reflector.getAllAndOverride<RoleTypes[]>(roleKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles?.includes(user.role)) {
      throw new ForbiddenException('Not Authorized account');
    }

    return true;
  }
}
