import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PremiumSalesService } from './premium_sales.service';
import { PremiumSalesController } from './premium_sales.controller';
import { PremiumSales, PremiumSalesSchema } from './schemas/premium_sales.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PremiumSales.name, schema: PremiumSalesSchema }])],
  controllers: [PremiumSalesController],
  providers: [PremiumSalesService],
})
export class PremiumSalesModule {}
