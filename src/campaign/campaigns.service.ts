import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return createdCampaign.save();
  }

  async findAll(page: number, limit: number): Promise<{ data: Campaign[], total: number, page: number, limit: number, totalPages: number }> {
    const offset = (page - 1) * limit;
    const data = await this.campaignModel.find().skip(offset).limit(limit).exec();
    const total = await this.campaignModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
    const existingCampaign = await this.campaignModel.findByIdAndUpdate(
      id,
      updateCampaignDto,
      { new: true },
    );
    if (!existingCampaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return existingCampaign;
  }

  async remove(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findByIdAndDelete(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }
}
