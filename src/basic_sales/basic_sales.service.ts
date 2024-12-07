import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasicSales, BasicSalesDocument } from './schemas/basic_sales.schema';
import { CreateBasicSalesDto } from './dto/create-basic_sales.dto';
import { UpdateBasicSalesDto } from './dto/update-basic_sales.dto';

@Injectable()
export class BasicSalesService {
  constructor(
    @InjectModel(BasicSales.name)
    private basicSalesModel: Model<BasicSalesDocument>,
  ) {}

  async create(createBasicSalesDto: CreateBasicSalesDto): Promise<BasicSales> {
    const createdBasicSales = new this.basicSalesModel(createBasicSalesDto);
    return createdBasicSales.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: BasicSales[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.basicSalesModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.basicSalesModel.countDocuments().exec();
    const pageCount = Math.ceil(total / limit);
    return { data, total, page, limit, pageCount };
  }

  async findOne(id: string): Promise<BasicSales> {
    const basicSales = await this.basicSalesModel.findById(id).exec();
    if (!basicSales) {
      throw new NotFoundException(`BasicSales with ID ${id} not found`);
    }
    return basicSales;
  }

  async update(
    id: string,
    updateBasicSalesDto: UpdateBasicSalesDto,
  ): Promise<BasicSales> {
    const existingBasicSales = await this.basicSalesModel.findByIdAndUpdate(
      id,
      updateBasicSalesDto,
      { new: true },
    );
    if (!existingBasicSales) {
      throw new NotFoundException(`BasicSales with ID ${id} not found`);
    }
    return existingBasicSales;
  }

  async remove(id: string): Promise<BasicSales> {
    const basicSales = await this.basicSalesModel.findByIdAndDelete(id);
    if (!basicSales) {
      throw new NotFoundException(`BasicSales with ID ${id} not found`);
    }
    return basicSales;
  }
}
