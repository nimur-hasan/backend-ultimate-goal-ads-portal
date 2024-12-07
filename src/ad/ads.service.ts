import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdDocument } from './schemas/ad.schema';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad.name) private adModel: Model<AdDocument>) {}

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const createdAd = new this.adModel(createAdDto);
    return createdAd.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: Ad[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.adModel.find().skip(offset).limit(limit).exec();
    const total = await this.adModel.countDocuments().exec();
    const pageCount = Math.ceil(total / limit);
    return { data, total, page, limit, pageCount };
  }

  async findOne(id: string): Promise<Ad> {
    const ad = await this.adModel.findById(id).exec();
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return ad;
  }

  async update(id: string, updateAdDto: UpdateAdDto): Promise<Ad> {
    const existingAd = await this.adModel.findByIdAndUpdate(id, updateAdDto, {
      new: true,
    });
    if (!existingAd) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return existingAd;
  }

  async remove(id: string): Promise<Ad> {
    const ad = await this.adModel.findByIdAndDelete(id);
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return ad;
  }
}
