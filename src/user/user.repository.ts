import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dtos/createUser.dto';
import { updateUserProfileDto } from './dtos/updateUser.dto';
import { updateUserRoleDto } from './dtos/updateUserRole.dto';
import { Injectable } from '@nestjs/common';
import { deleteUserDto } from './dtos/deleteUser.dto';
import { updateUserShop } from './dtos/updateUserShop.dto';
import { UpdateUserOtpDto } from './dtos/updateUserOtp.dto';
import { UpdateVarifiedUser } from './dtos/updateVarifiedUser.dto';
import { registerDto } from 'src/authentication/dtos/register.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: registerDto): Promise<User | any> {
    const createdUser = new this.userModel(userData);
    const createdNewUser = await createdUser.save();
    console.log(createdNewUser);
    return createdNewUser;
  }

  async find(query) {
    return await this.userModel.find(query);
  }

  async findAll(query = {}, page = 1, limit = 10): Promise<User[] | any> {
    const documents = await this.userModel.countDocuments();
    const meta = {
      totalPages: Math.ceil(documents / limit),
      currentPage: page,
      itemsPerPage: limit,
      totalItems: documents,
    };
    const data = await this.userModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    return { meta: { ...meta, currentItemsCount: data.length }, data };
  }

  async findOne(query: any): Promise<User | any> {
    return await this.userModel.findOne(query);
  }

  async updateOne(
    _id: string,
    data:
      | updateUserProfileDto
      | updateUserRoleDto
      | deleteUserDto
      | updateUserShop
      | UpdateUserOtpDto
      | UpdateVarifiedUser
      | any,
  ): Promise<User | any> {
    //console.log(data);
    return await this.userModel.findByIdAndUpdate(_id, data, { new: true });
  }

  async delete(_id: string): Promise<any | null> {
    return await this.userModel.findByIdAndUpdate(
      _id,
      { delete: true },
      { new: true },
    );
  }
}
