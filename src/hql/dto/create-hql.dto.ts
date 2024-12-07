import { IsString, IsDateString } from 'class-validator';

export class CreateHqlDto {
  @IsString()
  client_id: string;

  @IsString()
  email: string;

  @IsDateString()
  date_qualified: Date;

  @IsDateString()
  date_created: Date;

  @IsString()
  utm_source: string;

  @IsString()
  adset_id: string;

  @IsString()
  campaign_id: string;

  @IsString()
  ad_id: string;

  @IsString()
  gclid: string;

  @IsString()
  name: string;

  @IsString()
  lead_quality: string;

  @IsString()
  ad_name: string;

  @IsString()
  ad_set_name: string;

  @IsDateString()
  call_book_date: Date;

  @IsString()
  call_booked: string;

  @IsString()
  campaign_name: string;

  @IsString()
  country: string;

  @IsDateString()
  lead_registration_date: Date;
}
