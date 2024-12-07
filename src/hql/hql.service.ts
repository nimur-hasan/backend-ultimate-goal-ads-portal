import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hql, HqlDocument } from './schemas/hql.schema';
import { CreateHqlDto } from './dto/create-hql.dto';
import { UpdateHqlDto } from './dto/update-hql.dto';

@Injectable()
export class HqlService {
  constructor(
    @InjectModel(Hql.name) private hqlModel: Model<HqlDocument>,
  ) {}

  async create(createHqlDto: CreateHqlDto): Promise<Hql> {
    const createdHql = new this.hqlModel(createHqlDto);
    return createdHql.save();
  }

  async findAll(page: number, limit: number): Promise<{ data: Hql[], total: number, page: number, limit: number, totalPages: number }> {
    const offset = (page - 1) * limit;
    const data = await this.hqlModel.find().skip(offset).limit(limit).exec();
    const total = await this.hqlModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  }

  async findOne(id: string): Promise<Hql> {
    const hql = await this.hqlModel.findById(id).exec();
    if (!hql) {
      throw new NotFoundException(`Hql with ID ${id} not found`);
    }
    return hql;
  }

  async update(id: string, updateHqlDto: UpdateHqlDto): Promise<Hql> {
    const existingHql = await this.hqlModel.findByIdAndUpdate(
      id,
      updateHqlDto,
      { new: true },
    );
    if (!existingHql) {
      throw new NotFoundException(`Hql with ID ${id} not found`);
    }
    return existingHql;
  }

  async remove(id: string): Promise<Hql> {
    const hql = await this.hqlModel.findByIdAndDelete(id);
    if (!hql) {
      throw new NotFoundException(`Hql with ID ${id} not found`);
    }
    return hql;
  }
}
