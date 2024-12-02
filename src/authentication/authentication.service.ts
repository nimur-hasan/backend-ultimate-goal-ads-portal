import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { uid } from 'uid';

@Injectable()
export class AuthenticationService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}
  async registration(data: registerDto) {
    const { email } = data;

    //console.log(data);
    const existUser = await this.UserService.findUserByEmail(email);
    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = await this.UserService.createUser(data);

    return createdUser;
  }

  async login(data: LoginDto) {
    const { email, password: pwd } = data;

    const user = await this.UserService.findUserByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const isMatched = await bcrypt.compare(pwd, user.password);

    if (!isMatched) throw new BadRequestException('Password was incorrect');

    const access_token = await this.jwtService.sign({
      _id: user._id,
    });

    console.log({ user });

    return {
      token: access_token,
      user,
    };
  }

  async forgotPassword(email: string) {
    try {
      const min = 1000; // Minimum four-digit number
      const max = 9999; // Maximum four-digit number
      const newOtp = Math.floor(Math.random() * (max - min + 1)) + min;
      // const otpString = newOtp.toString().padStart(4, '0'); // Ensure four digits

      //console.log(newOtp);
      const existUser = await this.UserService.findUserByEmail(email);
      if (!existUser) throw new NotFoundException('Your email is incorrect.');

      const now = new Date();
      const expDate = new Date(now.getTime() + 5 * 60000);
      const updatedUser = await this.UserService.updateUserOtp(existUser._id, {
        otp: {
          code: newOtp,
          exp: expDate,
        },
      });

      // Send Mail
      // await this.mailService.sendOtp(
      //   updatedUser.name,
      //   updatedUser.email,
      //   existUser.shop.shopName,
      //   newOtp,
      // );
      return { data: 'An OTP has been sent to your email address.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendOtp(email: string) {
    const newOtp = Math.round(Math.random() * 10000);
    //console.log(newOtp);
    const existUser = await this.UserService.findUserByEmail(email);
    if (!existUser) throw new NotFoundException('Your email is incorrect.');

    const now = new Date();
    const expDate = new Date(now.getTime() + 5 * 60000);
    await this.UserService.updateUserOtp(existUser._id, {
      otp: {
        code: newOtp,
        exp: expDate,
      },
    });
    // Send Mail
    return 'An OTP has been sent to your email address.';
  }

  async confirmOtp(email: string, otp: number) {
    const existUser = await this.UserService.findUserByEmail(email);
    if (!existUser) throw new NotFoundException('Your email is incorrect.');
    const { code, exp } = existUser.otp;
    //console.log(new Date(exp));
    //console.log(new Date());
    if (new Date(exp) < new Date())
      throw new UnauthorizedException('OTP expired');
    if (code !== otp) throw new UnauthorizedException('Invalid OTP code');
    await this.UserService.setUserVerified(existUser._id);

    // const token=UUID()
    const resetToken = await uid(40);

    await this.UserService.setUserResetToken(existUser._id, resetToken);

    return { message: 'Otp varified.', resetToken };
  }

  async setPassword(resetToken: string, password: string) {
    const existUser = await this.UserService.findUserByResetToken(resetToken);
    if (!existUser) throw new NotFoundException('Your token is incorrect.');

    await this.UserService.removeResetToken(existUser._id);

    return await this.UserService.updatePassword(existUser._id, password);
  }
}
