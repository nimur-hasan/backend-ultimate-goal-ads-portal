import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserRoleDto {
  @ApiProperty({
    description: 'User type should be PHARMACIST/GENERAL_USER',
    example: 'GENERAL_USER',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEnum(['PHARMACIST', 'GENERAL_USER'])
  userType: string;
}
