import {
  MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
  Virtual,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { generateHash } from 'src/common/security/hash.secutity';

export enum GenderTypes {
  male = 'male',
  female = 'female',
}
export enum RoleTypes {
  user = 'user',
  admin = 'admin',
}

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  @Virtual({
    get(this: User) {
      return this.firstName + ' ' + this.lastName;
    },
    set(this: User, value: string) {
      this.firstName = value.split(' ')[0];
      this.lastName = value.split(' ')[1] || '';
    },
  })
  fullName: string;
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
    trim: true,
  })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({})
  phone: string;

  @Prop({})
  address: string;

  @Prop({ type: Date })
  DOB: Date;

  @Prop({ type: Date })
  changeCredentialTime: Date;

  @Prop({ enum: GenderTypes, default: GenderTypes.male })
  gender: GenderTypes;

  @Prop({ enum: RoleTypes, default: RoleTypes.user })
  role: RoleTypes;

  @Prop({ type: Date })
  confirmEmail: Date;

  @Prop({})
  confirmEmailOTP: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory() {
      UserSchema.pre('save', function (next) {
        if (this.isModified('password'))
          this.password = generateHash(this.password);
        if (this.isModified('confirmEmailOTP'))
          this.confirmEmailOTP = generateHash(this.confirmEmailOTP);
        return next();
      });

      return UserSchema;
    },
  },
]);
