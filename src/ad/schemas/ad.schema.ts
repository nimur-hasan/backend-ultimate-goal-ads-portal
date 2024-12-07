import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdDocument = Ad & Document;

@Schema({ collection: 'ads', timestamps: true })
export class Ad {
  @Prop({ required: true })
  client_id: string;

  @Prop({ required: true })
  campaign_id: string;

  @Prop({ required: true })
  ad_set_id: string;

  @Prop({ required: true })
  ad_id: string;

  @Prop({ required: true })
  ad_name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: 0 })
  cost: number;

  @Prop({ required: true, default: 0 })
  clicks: number;

  @Prop({ required: false, default: 'NaN' })
  ctr: string;

  @Prop({ required: true })
  date_range: string;

  @Prop({ required: true })
  date_created: Date;

  @Prop({ required: true, default: 0 })
  calls_booked: number;

  @Prop({ required: true, default: 0 })
  cost_per_call_booked: number;

  @Prop({ required: true, default: 0 })
  cost_per_click: number;

  @Prop({ required: true, default: 0 })
  cost_per_hql: number;

  @Prop({ required: true, default: 0 })
  cost_per_lead: number;

  @Prop({ required: true, default: 0 })
  cost_per_sale: number;

  @Prop({ required: true, default: 0 })
  hql: number;

  @Prop({ required: true, default: 0 })
  hql_conversion_rate: number;

  @Prop({ required: true, default: 0 })
  leads: number;

  @Prop({ required: true, default: 0 })
  optin_rate: number;

  @Prop({ required: true, default: 0 })
  roi_basic_sales: number;

  @Prop({ required: true, default: 0 })
  roi_total_sales: number;

  @Prop({ required: true, default: 0 })
  total_basic_revenue: number;

  @Prop({ required: true, default: 0 })
  total_basic_sales: number;

  @Prop({ required: true, default: 0 })
  total_combined_revenue: number;

  @Prop({ required: true, default: 0 })
  total_premium_revenue: number;
}

export const AdSchema = SchemaFactory.createForClass(Ad);