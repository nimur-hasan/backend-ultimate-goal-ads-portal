import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AdSetsService } from './ad-sets.service';
import { CreateAdSetDto } from './dto/create-ad-set.dto';
import { UpdateAdSetDto } from './dto/update-ad-set.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('ad-sets')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('ad-sets')
export class AdSetsController {
  constructor(private readonly adSetsService: AdSetsService) {}

  @Post()
  create(@Body() createAdSetDto: CreateAdSetDto) {
    return this.adSetsService.create(createAdSetDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.adSetsService.findAll(Number(page), Number(limit), sortField, sortOrder);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adSetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdSetDto: UpdateAdSetDto) {
    return this.adSetsService.update(id, updateAdSetDto);
  }
}
