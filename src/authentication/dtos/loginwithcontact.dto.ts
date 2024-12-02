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



export class LoginWithContactNumberDto {
  @ApiProperty({
    example: '+8801712345678',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  contact_number: string;

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
