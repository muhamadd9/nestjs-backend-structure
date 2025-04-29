import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from './db.repository';
import { User, UserDocument } from '../model/User.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepositoryService extends DatabaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
