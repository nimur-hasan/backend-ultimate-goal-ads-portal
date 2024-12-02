import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmOtpDto {
  @ApiProperty({
    example: 'femi@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
