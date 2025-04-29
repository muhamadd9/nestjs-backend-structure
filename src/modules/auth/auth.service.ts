import { UserRepositoryService } from './../../DB/repository/User.repository.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfirmEmailDTO, createAccontDto, loginDto } from './dto/auth.dto';
import { compareHash } from 'src/common/security/hash.secutity';
import { sendEmail } from 'src/common/email/sendEmail';
import { TokenService, TokenTypes } from 'src/common/service/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly tokenService: TokenService,
  ) {}
  private generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
  async signup(body: createAccontDto) {
    const { email, password, fullName } = body;

    if (await this.userRepositoryService.findOne({ filter: { email } })) {
      throw new ConflictException('Email Exists');
    }

    const otp = this.generateOTP();
    await sendEmail({
      to: email,
      subject: 'Confirm-Email',
      html: `<h1>Your OTP is: ${otp}</h1>`,
    });

    const user = await this.userRepositoryService.create({
      email,
      password,
      fullName,
      confirmEmailOTP: `${otp}`,
    });

    return { message: 'User signed up successfully', user };
  }

  async confirmEmail(body: ConfirmEmailDTO): Promise<{ message: string }> {
    const { email, otp } = body;

    const user = await this.userRepositoryService.findOne({
      filter: { email, confirmEmail: { $exists: false } },
    });

    if (!user) {
      throw new NotFoundException('Not Found or already confirmed');
    }
    if (!compareHash(otp, user.confirmEmailOTP)) {
      throw new BadRequestException('invalidOTP');
    }

    await this.userRepositoryService.updateOne({
      filter: { _id: user._id },
      data: {
        confirmEmail: Date.now(),
        $unset: {
          confirmEmailOTP: 0,
        },
      },
    });
    return { message: 'Done' };
  }

  async login(body: loginDto): Promise<{
    message: string;
    data: { accessToken: string; refreshToken: string };
  }> {
    const { email, password } = body;
    const user = await this.userRepositoryService.findOne({
      filter: { email },
    });

    if (!user) throw new NotFoundException('User Not Found');
    if (!compareHash(password, user.password)) {
      throw new BadRequestException('Password is Wrong');
    }

    const accessToken = this.tokenService.generateToken({
      payload: { id: user._id },
      role: user.role,
      type: TokenTypes.ACCESS,
    });

    const refreshToken = this.tokenService.generateToken({
      payload: { id: user._id },
      role: user.role,
      type: TokenTypes.REFRESH,
    });

    return {
      message: 'User logged in successfully',
      data: { accessToken, refreshToken },
    };
  }
}
