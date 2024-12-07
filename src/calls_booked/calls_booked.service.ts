import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CallsBooked,
  CallsBookedDocument,
} from './schemas/calls_booked.schema';
import { CreateCallsBookedDto } from './dto/create-calls_booked.dto';
import { UpdateCallsBookedDto } from './dto/update-calls_booked.dto';

@Injectable()
export class CallsBookedService {
  constructor(
    @InjectModel(CallsBooked.name)
    private callsBookedModel: Model<CallsBookedDocument>,
  ) {}

  async create(
    createCallsBookedDto: CreateCallsBookedDto,
  ): Promise<CallsBooked> {
    const createdCallsBooked = new this.callsBookedModel(createCallsBookedDto);
    return createdCallsBooked.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: CallsBooked[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    const offset = (page - 1) * limit;
    const data = await this.callsBookedModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.callsBookedModel.countDocuments().exec();
    const pageCount = Math.ceil(total / limit);
    return { data, total, page, limit, pageCount };
  }

  async findOne(id: string): Promise<CallsBooked> {
    const callsBooked = await this.callsBookedModel.findById(id).exec();
    if (!callsBooked) {
      throw new NotFoundException(`CallsBooked with ID ${id} not found`);
    }
    return callsBooked;
  }

  async update(
    id: string,
    updateCallsBookedDto: UpdateCallsBookedDto,
  ): Promise<CallsBooked> {
    const existingCallsBooked = await this.callsBookedModel.findByIdAndUpdate(
      id,
      updateCallsBookedDto,
      { new: true },
    );
    if (!existingCallsBooked) {
      throw new NotFoundException(`CallsBooked with ID ${id} not found`);
    }
    return existingCallsBooked;
  }

  async remove(id: string): Promise<CallsBooked> {
    const callsBooked = await this.callsBookedModel.findByIdAndDelete(id);
    if (!callsBooked) {
      throw new NotFoundException(`CallsBooked with ID ${id} not found`);
    }
    return callsBooked;
  }
}
