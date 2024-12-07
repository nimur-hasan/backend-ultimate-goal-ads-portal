import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Daily, DailyDocument } from './schemas/daily.schema';
import { CreateDailyDto } from './dto/create-daily.dto';
import { UpdateDailyDto } from './dto/update-daily.dto';

@Injectable()
export class DailyService {
  constructor(
    @InjectModel(Daily.name) private dailyModel: Model<DailyDocument>,
  ) {}

  async create(createDailyDto: CreateDailyDto): Promise<Daily> {
    const createdDaily = new this.dailyModel(createDailyDto);
    return createdDaily.save();
  }

  async findAll(page: number, limit: number): Promise<{ data: Daily[], total: number, page: number, limit: number, totalPages: number }> {
    const offset = (page - 1) * limit;
    const data = await this.dailyModel.find().skip(offset).limit(limit).exec();
    const total = await this.dailyModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  }

  async findOne(id: string): Promise<Daily> {
    const daily = await this.dailyModel.findById(id).exec();
    if (!daily) {
      throw new NotFoundException(`Daily record with ID ${id} not found`);
    }
    return daily;
  }

  async update(id: string, updateDailyDto: UpdateDailyDto): Promise<Daily> {
    const existingDaily = await this.dailyModel.findByIdAndUpdate(
      id,
      updateDailyDto,
      { new: true },
    );
    if (!existingDaily) {
      throw new NotFoundException(`Daily record with ID ${id} not found`);
    }
    return existingDaily;
  }

  async remove(id: string): Promise<Daily> {
    const daily = await this.dailyModel.findByIdAndDelete(id);
    if (!daily) {
      throw new NotFoundException(`Daily record with ID ${id} not found`);
    }
    return daily;
  }
}
