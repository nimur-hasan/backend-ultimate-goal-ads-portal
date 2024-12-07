import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreatePremiumSalesDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  revenue: number;

  @IsString()
  ad_id: string;

  @IsString()
  ad_name: string;

  @IsString()
  ad_set_name: string;

  @IsString()
  adset_id: string;

  @IsDateString()
  call_book_date: Date;

  @IsString()
  call_booked: string;

  @IsString()
  campaign_id: string;

  @IsString()
  campaign_name: string;

  @IsString()
  lead_quality: string;

  @IsDateString()
  lead_registration_date: Date;

  @IsDateString()
  date_created: Date;
}
