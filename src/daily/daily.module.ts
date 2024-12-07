import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyService } from './daily.service';
import { DailyController } from './daily.controller';
import { Daily, DailySchema } from './schemas/daily.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Daily.name, schema: DailySchema }])],
  controllers: [DailyController],
  providers: [DailyService],
})
export class DailyModule {}
