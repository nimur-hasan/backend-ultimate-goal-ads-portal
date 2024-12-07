import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdSetsModule } from './ad_sets/ad_sets.module';
import { BasicSalesModule } from './basic_sales/basic_sales.module';
import { CallsBookedModule } from './calls_booked/calls_booked.module';
import { DailyModule } from './daily/daily.module';
import { HqlModule } from './hql/hql.module';
import { PremiumSalesModule } from './premium_sales/premium_sales.module';
import { AdsModule } from './ad/ad.module';
import { CampaignsModule } from './campaign/campaign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI,
    ),
    AuthenticationModule,
    UserModule,
    AdSetsModule,
    AdsModule,
    BasicSalesModule,
    CallsBookedModule,
    CampaignsModule,
    DailyModule,
    HqlModule,
    PremiumSalesModule,
  ],
})
export class AppModule {}
