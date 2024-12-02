import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class registerDto {
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
    description: 'Password',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
