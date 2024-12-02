import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';

export type UserDocument = User & Document;
export class Otp {
  @Prop({ default: '' })
  code: number;
  @Prop({ required: false })
  exp: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: String;
  @Prop({ required: true })
  lastName: String;
  @Prop({ required: true })
  email: String;
  @Prop({ required: true })
  phone: String;
  @Prop({ required: true })
  password: String;

  @Prop({ default: 'User' })
  userType: String;

  @Prop({ default: new Date() })
  lastActive: String;
  @Prop({ default: false })
  delete: boolean;
  @Prop({ default: false })
  isDeactive: boolean;
  @Prop({ required: false })
  otp: Otp;
  @Prop({ default: '' })
  resetToken: string;
  @Prop({ default: false })
  varified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
