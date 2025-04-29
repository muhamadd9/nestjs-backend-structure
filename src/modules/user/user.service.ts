import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/DB/model/User.model';

@Injectable()
export class UserService {
  profile(user: UserDocument) {
    return user;
  }
}
