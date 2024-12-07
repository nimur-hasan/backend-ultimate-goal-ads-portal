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
  import { PremiumSalesService } from './premium_sales.service';
  import { CreatePremiumSalesDto } from './dto/create-premium_sales.dto';
  import { UpdatePremiumSalesDto } from './dto/update-premium_sales.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags("Premium Sales")
  @Controller('premium_sales')
  export class PremiumSalesController {
    constructor(private readonly premiumSalesService: PremiumSalesService) {}
  
    @Post()
    create(@Body() createPremiumSalesDto: CreatePremiumSalesDto) {
      return this.premiumSalesService.create(createPremiumSalesDto);
    }
  
    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
      return this.premiumSalesService.findAll(Number(page), Number(limit));
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.premiumSalesService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePremiumSalesDto: UpdatePremiumSalesDto) {
      return this.premiumSalesService.update(id, updatePremiumSalesDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.premiumSalesService.remove(id);
    }
  }
  