import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAdSetDto } from './dto/update-ad-set.dto';
import { CreateAdSetDto } from './dto/create-ad-set.dto';
import { AdSet, AdSetDocument } from './schemas/ad-sets.schema';

@Injectable()
export class AdSetsService {
  constructor(
    @InjectModel(AdSet.name) private adSetModel: Model<AdSetDocument>,
  ) {}

  async create(createAdSetDto: CreateAdSetDto): Promise<AdSet> {
    const createdAdSet = new this.adSetModel(createAdSetDto);
    return createdAdSet.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: AdSet[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.adSetModel.find().skip(offset).limit(limit).exec();
    const total = await this.adSetModel.countDocuments().exec();
    const pageCount = Math.ceil(total / limit);
    return { data, total, page, limit, pageCount };
  }

  async findOne(id: string): Promise<AdSet> {
    const adSet = await this.adSetModel.findById(id).exec();
    if (!adSet) {
      throw new NotFoundException(`AdSet with ID ${id} not found`);
    }
    return adSet;
  }

  async update(id: string, updateAdSetDto: UpdateAdSetDto): Promise<AdSet> {
    const existingAdSet = await this.adSetModel.findByIdAndUpdate(
      id,
      updateAdSetDto,
      { new: true },
    );
    if (!existingAdSet) {
      throw new NotFoundException(`AdSet with ID ${id} not found`);
    }
    return existingAdSet;
  }
}
