import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SetPwdDto {
  @ApiProperty({
    description: 'Token',
    example: '',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    example: 'Abcd@1234',
  })
  @IsStrongPassword()
  password: string;
}
