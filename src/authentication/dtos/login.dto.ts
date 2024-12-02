import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
  ValidationArguments,
} from 'class-validator';

@Injectable()
class AtLeastOneExists {
  validate(value: any, args: ValidationArguments) {
    const contactNumber = args.object['contact_number'];
    const email = args.object['email'];
    return !!(contactNumber || email);
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one of contact_number or email is required';
  }
}

export class LoginDto {
  @ApiProperty({
    example: 'femi@gmail.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  @Validate(AtLeastOneExists)
  email: string;

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
