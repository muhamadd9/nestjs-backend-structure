import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  Matches,
} from 'class-validator';

export function IsMatchPassword(
  matchWith: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [matchWith],
      validator: {
        validate(value: string, args: ValidationArguments) {
          return args?.object[args.constraints[0] as string] == value;
        },
      },
    });
  };
}

export class createAccontDto {
  @IsString({ message: 'Provide username' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  fullName: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsMatchPassword('password', {
    message: 'ConfirmPassword should match password',
  })
  confirmPassword: string;
}

export class ConfirmEmailDTO {
  @IsEmail()
  email: string;

  @Matches(/^\d{6}$/)
  otp: string;
}

export class loginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
