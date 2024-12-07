import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HqlService } from './hql.service';
import { HqlController } from './hql.controller';
import { Hql, HqlSchema } from './schemas/hql.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hql.name, schema: HqlSchema }])],
  controllers: [HqlController],
  providers: [HqlService],
})
export class HqlModule {}
