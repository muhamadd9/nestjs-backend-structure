import { TokenService } from 'src/common/service/token.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/DB/model/User.model';
import { UnauthorizedException } from '@nestjs/common';

export interface IUserRequest extends Request {
  user: UserDocument;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IUserRequest>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }
    request.user = await this.tokenService.verifyToken({ authorization });

    return true;
  }
}
