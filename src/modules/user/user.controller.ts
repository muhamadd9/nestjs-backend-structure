import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { RoleTypes, UserDocument } from 'src/DB/model/User.model';
import { Auth } from 'src/common/decorators/authentication.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([RoleTypes.admin])
  @Get('profile')
  profile(@User() user: UserDocument) {
    return this.userService.profile(user);
  }
}
