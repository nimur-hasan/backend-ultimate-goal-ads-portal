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
import { BasicSalesService } from './basic_sales.service';
import { CreateBasicSalesDto } from './dto/create-basic_sales.dto';
import { UpdateBasicSalesDto } from './dto/update-basic_sales.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Basic Sales')
@Controller('basic_sales')
export class BasicSalesController {
  constructor(private readonly basicSalesService: BasicSalesService) {}

  @Post()
  create(@Body() createBasicSalesDto: CreateBasicSalesDto) {
    return this.basicSalesService.create(createBasicSalesDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.basicSalesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicSalesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBasicSalesDto: UpdateBasicSalesDto,
  ) {
    return this.basicSalesService.update(id, updateBasicSalesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicSalesService.remove(id);
  }
}
