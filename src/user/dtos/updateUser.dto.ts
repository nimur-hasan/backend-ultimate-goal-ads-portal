import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateUserProfileDto {
  @ApiProperty({
    description: 'First Name',
    example: 'Md Nimur',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Hasan',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email',
    example: 'example@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+123456789',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
