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
  import { CallsBookedService } from './calls_booked.service';
  import { CreateCallsBookedDto } from './dto/create-calls_booked.dto';
  import { UpdateCallsBookedDto } from './dto/update-calls_booked.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags("Call Booked")
  @Controller('calls_booked')
  export class CallsBookedController {
    constructor(private readonly callsBookedService: CallsBookedService) {}
  
    @Post()
    create(@Body() createCallsBookedDto: CreateCallsBookedDto) {
      return this.callsBookedService.create(createCallsBookedDto);
    }
  
    @Get()
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
      return this.callsBookedService.findAll(Number(page), Number(limit));
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.callsBookedService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCallsBookedDto: UpdateCallsBookedDto) {
      return this.callsBookedService.update(id, updateCallsBookedDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.callsBookedService.remove(id);
    }
  }
  