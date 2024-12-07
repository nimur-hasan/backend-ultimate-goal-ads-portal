import { IsDateString, IsNumber } from 'class-validator';

export class CreateDailyDto {
  @IsDateString()
  date: Date;

  @IsNumber()
  cost_micros: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  total_leads: number;

  @IsNumber()
  total_hql: number;

  @IsNumber()
  cost_per_lead: number;

  @IsNumber()
  cost_per_hql: number;

  @IsDateString()
  date_created: Date;
}
