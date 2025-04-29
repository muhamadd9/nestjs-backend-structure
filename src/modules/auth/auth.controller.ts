import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfirmEmailDTO, createAccontDto, loginDto } from './dto/auth.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body()
    body: createAccontDto,
  ) {
    return this.authService.signup(body);
  }
  @Patch('confirm-email')
  confirmEmail(
    @Body()
    body: ConfirmEmailDTO,
  ): any {
    return this.authService.confirmEmail(body);
  }
  @Post('login')
  login(@Body() body: loginDto) {
    return this.authService.login(body);
  }
}
