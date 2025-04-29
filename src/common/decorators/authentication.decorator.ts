import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleTypes } from 'src/DB/model/User.model';
import { Roles } from './roles.decorator';
import { AuthenticationGuard } from '../guard/authentication/authentication.guard';
import { AuthorziationGuard } from '../guard/authorziation/authorziation.guard';

export function Auth(roles: RoleTypes[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthenticationGuard, AuthorziationGuard),
  );
}
