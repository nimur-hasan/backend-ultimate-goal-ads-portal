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
import { DailyService } from './daily.service';
import { CreateDailyDto } from './dto/create-daily.dto';
import { UpdateDailyDto } from './dto/update-daily.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Daily')
@Controller('daily')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @Post()
  create(@Body() createDailyDto: CreateDailyDto) {
    return this.dailyService.create(createDailyDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.dailyService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDailyDto: UpdateDailyDto) {
    return this.dailyService.update(id, updateDailyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyService.remove(id);
  }
}
