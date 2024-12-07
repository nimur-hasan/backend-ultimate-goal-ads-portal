import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  client_id: string;

  @IsString()
  campaign_id: string;

  @IsString()
  campaign_name: string;

  @IsString()
  status: string;

  @IsNumber()
  @IsOptional()
  cost: number;

  @IsNumber()
  @IsOptional()
  clicks: number;

  @IsString()
  @IsOptional()
  ctr: string;

  @IsString()
  date_range: string;

  @IsDateString()
  date_created: Date;

  @IsNumber()
  @IsOptional()
  calls_booked: number;

  @IsNumber()
  @IsOptional()
  cost_per_call_booked: number;

  @IsNumber()
  @IsOptional()
  cost_per_click: number;

  @IsNumber()
  @IsOptional()
  cost_per_hql: number;

  @IsNumber()
  @IsOptional()
  cost_per_lead: number;

  @IsNumber()
  @IsOptional()
  cost_per_sale: number;

  @IsNumber()
  @IsOptional()
  hql: number;

  @IsNumber()
  @IsOptional()
  leads: number;

  @IsNumber()
  @IsOptional()
  optin_rate: number;

  @IsNumber()
  @IsOptional()
  roi_basic_sales: number;

  @IsNumber()
  @IsOptional()
  roi_total_sales: number;

  @IsNumber()
  @IsOptional()
  total_basic_revenue: number;

  @IsNumber()
  @IsOptional()
  total_basic_sales: number;

  @IsNumber()
  @IsOptional()
  total_combined_revenue: number;

  @IsNumber()
  @IsOptional()
  total_premium_revenue: number;

  @IsNumber()
  @IsOptional()
  hql_conversion_rate: number;
}
