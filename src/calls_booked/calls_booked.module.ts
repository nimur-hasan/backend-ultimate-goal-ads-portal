import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallsBookedService } from './calls_booked.service';
import { CallsBookedController } from './calls_booked.controller';
import { CallsBooked, CallsBookedSchema } from './schemas/calls_booked.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CallsBooked.name, schema: CallsBookedSchema }])],
  controllers: [CallsBookedController],
  providers: [CallsBookedService],
})
export class CallsBookedModule {}
