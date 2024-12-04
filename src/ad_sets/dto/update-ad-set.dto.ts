import { PartialType } from '@nestjs/mapped-types';
import { CreateAdSetDto } from './create-ad-set.dto';

export class UpdateAdSetDto extends PartialType(CreateAdSetDto) {}
