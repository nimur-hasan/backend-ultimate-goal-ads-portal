import { PartialType } from '@nestjs/mapped-types';
import { CreatePremiumSalesDto } from './create-premium_sales.dto';

export class UpdatePremiumSalesDto extends PartialType(CreatePremiumSalesDto) {}
