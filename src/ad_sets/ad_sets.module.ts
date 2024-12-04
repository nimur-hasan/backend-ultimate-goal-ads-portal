import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdSet, AdSetSchema } from './schemas/ad-sets.schema';
import { AdSetsController } from './ad-sets.controller';
import { AdSetsService } from './ad-sets.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/constants/jwtConstants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: AdSet.name, schema: AdSetSchema }]),
  ],
  controllers: [AdSetsController],
  providers: [AdSetsService],
})
export class AdSetsModule {}
