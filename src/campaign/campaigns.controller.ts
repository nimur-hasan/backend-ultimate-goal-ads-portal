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
  import { CampaignsService } from './campaigns.service';
  import { CreateCampaignDto } from './dto/create-campaign.dto';
  import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags("Campaigns")
  @Controller('campaigns')
  export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) {}
  
    @Post()
    create(@Body() createCampaignDto: CreateCampaignDto) {
      return this.campaignsService.create(createCampaignDto);
    }
  
    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
      return this.campaignsService.findAll(Number(page), Number(limit));
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.campaignsService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
      return this.campaignsService.update(id, updateCampaignDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.campaignsService.remove(id);
    }
  }
  