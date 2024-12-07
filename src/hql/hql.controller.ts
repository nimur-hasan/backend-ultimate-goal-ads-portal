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
  import { HqlService } from './hql.service';
  import { CreateHqlDto } from './dto/create-hql.dto';
  import { UpdateHqlDto } from './dto/update-hql.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('HQL')
  @Controller('hql')
  export class HqlController {
    constructor(private readonly hqlService: HqlService) {}
  
    @Post()
    create(@Body() createHqlDto: CreateHqlDto) {
      return this.hqlService.create(createHqlDto);
    }
  
    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
      return this.hqlService.findAll(Number(page), Number(limit));
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.hqlService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateHqlDto: UpdateHqlDto) {
      return this.hqlService.update(id, updateHqlDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.hqlService.remove(id);
    }
  }
  