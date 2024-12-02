import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Validate,
  ValidationArguments,
} from 'class-validator';

export class LoginWithEmailDto {
  @ApiProperty({
    example: 'femi@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
