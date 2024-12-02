import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPwdDto {
  @ApiProperty({
    example: 'developernaim20@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
