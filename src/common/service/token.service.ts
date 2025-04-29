import { UserRepositoryService } from './../../DB/repository/User.repository.service';
import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { RoleTypes } from 'src/DB/model/User.model';

export enum TokenTypes {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}
export enum BearerTypes {
  Bearer = 'Bearer',
  System = 'System',
}

interface ITokenPayload extends JwtPayload {
  id: Types.ObjectId;
}

interface IGenerateToken {
  payload: ITokenPayload;
  role?: RoleTypes;
  type?: TokenTypes;
  expiresIn?: number;
}

interface IVerifyToken {
  authorization: string;
  type?: TokenTypes;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  generateToken({
    payload,
    type = TokenTypes.ACCESS,
    role = RoleTypes.user,
    expiresIn = parseInt(process.env.EXPIRES_IN as string),
  }: IGenerateToken) {
    const { accessSignature, refreshSignature } = this.getSignature(role);
    return this.jwtService.sign(payload, {
      secret: type === TokenTypes.ACCESS ? accessSignature : refreshSignature,
      expiresIn,
    });
  }

  async verifyToken({ authorization, type = TokenTypes.ACCESS }: IVerifyToken) {
    try {
      const [bearer, token] = authorization.split(' ') || [];
      if (!bearer || !token) {
        throw new BadRequestException('token is required ');
      }
      if (!Object.values(BearerTypes).includes(bearer as BearerTypes)) {
        throw new Error('Invalid bearer type');
      }
      const typedBearer = bearer as BearerTypes;

      const { accessSignature, refreshSignature } = this.getSignature(
        typedBearer === BearerTypes.Bearer ? RoleTypes.user : RoleTypes.admin,
      );

      const decoded: ITokenPayload = this.jwtService.verify(token, {
        secret: type === TokenTypes.ACCESS ? accessSignature : refreshSignature,
      });
      if (!decoded?.id) {
        throw new UnauthorizedException('invalid token');
      }

      const user = await this.userRepositoryService.findOne({
        filter: { _id: decoded.id },
      });

      if (!user) {
        throw new NotFoundException('Account not found');
      }

      if (!decoded.iat) {
        throw new BadRequestException('Invalid token issue time');
      }

      if (user.changeCredentialTime?.getTime() >= decoded.iat * 1000) {
        throw new BadRequestException('Token Expired ');
      }
      return user;
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      if (error instanceof Error && error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Internal server error',
      );
    }
  }

  private getSignature(role: RoleTypes): {
    accessSignature: string;
    refreshSignature: string;
  } {
    let accessSignature: string;
    let refreshSignature: string;
    switch (role) {
      case RoleTypes.admin:
        accessSignature = process.env.ADMIN_ACCESS_SIGNATURE ?? '';
        refreshSignature = process.env.ADMIN_REFRESH_SIGNATURE ?? '';
        break;

      default:
        accessSignature = process.env.USER_ACCESS_SIGNATURE ?? '';
        refreshSignature = process.env.USER_REFRESH_SIGNATURE ?? '';
        break;
    }
    return { accessSignature, refreshSignature };
  }
}
