import { PartialType } from '@nestjs/mapped-types';
import { CreateBasicSalesDto } from './create-basic_sales.dto';

export class UpdateBasicSalesDto extends PartialType(CreateBasicSalesDto) {}
