import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
      example: '',
      required: false
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    example: 1,
  })
//   @IsNumber()
  page: number;

  @ApiProperty({
    example: 10,
  })
//   @IsNumber()
  limit: number;
}
