import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { registerDto } from './dtos/register.dto';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '../guard/auth.guard';
import { ForgotPwdDto } from './dtos/forgotpwd.dto';
import { ConfirmOtpDto } from './dtos/confirmotp.dto';
import { SetPwdDto } from './dtos/setpwd.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private AuthService: AuthenticationService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'Full shop registration (user)' })
  registration(@Body() body: registerDto) {
    //console.log({ body });
    return this.AuthService.registration(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'User login with email/contact_number) and password',
  })
  login(@Body() body: LoginDto) {
    return this.AuthService.login(body);
  }

  @Patch('/forgot-password')
  @ApiOperation({ summary: 'Forgot password (email)' })
  async forgotPassword(@Body() body: ForgotPwdDto) {
    return await this.AuthService.forgotPassword(body.email);
  }

  @Patch('/send-otp')
  @ApiOperation({ summary: 'Send Otp (email)' })
  async sendOtp(@Body() body: ForgotPwdDto) {
    return await this.AuthService.forgotPassword(body.email);
  }

  @Post('/verify-otp')
  @ApiOperation({ summary: 'confirm otp (email, otp)' })
  async confirmOtp(@Body() body: ConfirmOtpDto) {
    return await this.AuthService.confirmOtp(body.email, body.otp);
  }

  @Patch('/set-password')
  @ApiOperation({ summary: 'Set password (token, password)' })
  async setPassword(@Body() body: SetPwdDto) {
    return await this.AuthService.setPassword(body.token, body.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/check-token-validation')
  checkTokenValidation(@Request() req) {
    return req.user;
  }
}
