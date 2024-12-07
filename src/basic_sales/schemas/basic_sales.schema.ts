import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BasicSalesDocument = BasicSales & Document;

@Schema({ collection: 'basic_sales', timestamps: true })
export class BasicSales {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  revenue: number;

  @Prop({ required: true })
  ad_id: string;

  @Prop({ required: true })
  ad_name: string;

  @Prop({ required: true })
  ad_set_name: string;

  @Prop({ required: true })
  adset_id: string;

  @Prop({ required: true })
  call_book_date: Date;

  @Prop({ required: true })
  call_booked: string;

  @Prop({ required: true })
  campaign_id: string;

  @Prop({ required: true })
  campaign_name: string;

  @Prop({ required: true })
  lead_quality: string;

  @Prop({ required: true })
  lead_registration_date: Date;

  @Prop({ required: true })
  date_created: Date;

  @Prop({ required: true })
  client_id: string;
}

export const BasicSalesSchema = SchemaFactory.createForClass(BasicSales);