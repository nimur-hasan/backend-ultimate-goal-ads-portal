import { PartialType } from '@nestjs/mapped-types';
import { CreateHqlDto } from './create-hql.dto';

export class UpdateHqlDto extends PartialType(CreateHqlDto) {}
