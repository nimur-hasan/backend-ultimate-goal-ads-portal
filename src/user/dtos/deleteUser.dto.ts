import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class deleteUserDto {
  @IsNotEmpty()
  @IsString()
  delete: boolean;
}
