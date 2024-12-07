import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HqlDocument = Hql & Document;

@Schema({ collection: 'hql', timestamps: true })
export class Hql {
  @Prop({ required: true })
  client_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  date_qualified: Date;

  @Prop({ required: true })
  date_created: Date;

  @Prop({ required: true })
  utm_source: string;

  @Prop({ required: true })
  adset_id: string;

  @Prop({ required: true })
  campaign_id: string;

  @Prop({ required: true })
  ad_id: string;

  @Prop({ required: true })
  gclid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lead_quality: string;

  @Prop({ required: true })
  ad_name: string;

  @Prop({ required: true })
  ad_set_name: string;

  @Prop({ required: true })
  call_book_date: Date;

  @Prop({ required: true })
  call_booked: string;

  @Prop({ required: true })
  campaign_name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  lead_registration_date: Date;
}

export const HqlSchema = SchemaFactory.createForClass(Hql);
