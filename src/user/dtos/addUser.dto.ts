import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Femi John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'femi@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '01784905517',
  })
  @IsNotEmpty()
  @IsMobilePhone()
  contact_number: string;

  @IsString()
  @IsOptional()
  password: string;



  @ApiProperty({
    description: 'User type should be PHARMACIST/GENERAL_USER',
    example: 'GENERAL_USER',
  })
  @ApiProperty({
    description: 'Default Pharmacist',
    example: 'PHARMACIST',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(['PHARMACIST', 'GENERAL_USER'])
  userType: string;

  @IsNumber()
  @IsOptional()
  totalSales: number;

  @IsNumber()
  @IsOptional()
  totalImports: number;

  @IsNumber()
  @IsOptional()
  totalReturns: number;

  @IsNumber()
  @IsOptional()
  lastActive: string;

  @IsBoolean()
  @IsOptional()
  delete: boolean;

  @IsNumber()
  @IsOptional()
  isDeactive: boolean;
}
