import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicSalesService } from './basic_sales.service';
import { BasicSalesController } from './basic_sales.controller';
import { BasicSales, BasicSalesSchema } from './schemas/basic_sales.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BasicSales.name, schema: BasicSalesSchema }])],
  controllers: [BasicSalesController],
  providers: [BasicSalesService],
})
export class BasicSalesModule {}
