import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  create(@Body() createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.adsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adsService.update(id, updateAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(id);
  }
}
