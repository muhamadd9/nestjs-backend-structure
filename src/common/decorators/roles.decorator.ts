import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from 'src/DB/model/User.model';

export const roleKey = 'roles';
export const Roles = (roles: RoleTypes[]) => {
  return SetMetadata(roleKey, roles);
};
