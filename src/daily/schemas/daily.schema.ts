import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DailyDocument = Daily & Document;

@ApiTags("Daily")
@Schema({ collection: 'daily', timestamps: true })
export class Daily {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  cost_micros: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  total_leads: number;

  @Prop({ required: true })
  total_hql: number;

  @Prop({ required: true })
  cost_per_lead: number;

  @Prop({ required: true })
  cost_per_hql: number;

  @Prop({ required: true })
  date_created: Date;
}

export const DailySchema = SchemaFactory.createForClass(Daily);
