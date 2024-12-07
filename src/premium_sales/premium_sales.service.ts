import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PremiumSales, PremiumSalesDocument } from './schemas/premium_sales.schema';
import { CreatePremiumSalesDto } from './dto/create-premium_sales.dto';
import { UpdatePremiumSalesDto } from './dto/update-premium_sales.dto';

@Injectable()
export class PremiumSalesService {
  constructor(
    @InjectModel(PremiumSales.name) private premiumSalesModel: Model<PremiumSalesDocument>,
  ) {}

  async create(createPremiumSalesDto: CreatePremiumSalesDto): Promise<PremiumSales> {
    const createdPremiumSales = new this.premiumSalesModel(createPremiumSalesDto);
    return createdPremiumSales.save();
  }

  async findAll(page: number, limit: number): Promise<{ data: PremiumSales[], total: number, page: number, limit: number, totalPages: number }> {
    const offset = (page - 1) * limit;
    const data = await this.premiumSalesModel.find().skip(offset).limit(limit).exec();
    const total = await this.premiumSalesModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  }

  async findOne(id: string): Promise<PremiumSales> {
    const premiumSales = await this.premiumSalesModel.findById(id).exec();
    if (!premiumSales) {
      throw new NotFoundException(`PremiumSales with ID ${id} not found`);
    }
    return premiumSales;
  }

  async update(id: string, updatePremiumSalesDto: UpdatePremiumSalesDto): Promise<PremiumSales> {
    const existingPremiumSales = await this.premiumSalesModel.findByIdAndUpdate(
      id,
      updatePremiumSalesDto,
      { new: true },
    );
    if (!existingPremiumSales) {
      throw new NotFoundException(`PremiumSales with ID ${id} not found`);
    }
    return existingPremiumSales;
  }

  async remove(id: string): Promise<PremiumSales> {
    const premiumSales = await this.premiumSalesModel.findByIdAndDelete(id);
    if (!premiumSales) {
      throw new NotFoundException(`PremiumSales with ID ${id} not found`);
    }
    return premiumSales;
  }
}
