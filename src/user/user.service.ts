import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDto } from './dtos/createUser.dto';
import { updateUserRoleDto } from './dtos/updateUserRole.dto';
import { updateUserProfileDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserOtpDto } from './dtos/updateUserOtp.dto';
import { PaginationDto } from '../global/dtos/pagination.dto';
import { registerDto } from 'src/authentication/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(data: registerDto) {
    const { password } = data;

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);
    //console.log(hash);

    return await this.userRepository.create({
      ...data,
      password: hash,
    });
  }

  async getAllUsers(pagination: PaginationDto) {
    // return await this.userRepository.findAll(pagination);
    const { search, page, limit } = pagination;
    const query = {
      $and: [
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { contact_number: { $regex: search, $options: 'i' } },
            { userType: { $regex: search, $options: 'i' } },
          ],
        },
        { delete: false },
      ],
    };
    return await this.userRepository.findAll(
      search ? query : { delete: false },
      page,
      limit,
    );
  }

  async getUserById(_id: string) {
    return await this.userRepository.findOne({ _id });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async updateUserRole(_id: string, role: updateUserRoleDto) {
    return await this.userRepository.updateOne(_id, role);
  }

  async updateUserOtp(_id: string, otp: UpdateUserOtpDto) {
    return await this.userRepository.updateOne(_id, otp);
  }

  async setUserVerified(_id) {
    return await this.userRepository.updateOne(_id, { varified: true });
  }

  async setUserResetToken(_id, resetToken) {
    return await this.userRepository.updateOne(_id, { resetToken });
  }

  async removeResetToken(_id) {
    return await this.userRepository.updateOne(_id, { resetToken: null });
  }

  async findUserByResetToken(token: string) {
    return await this.userRepository.findOne({ resetToken: token });
  }

  async updateUserProfile(_id: string, data: updateUserProfileDto) {
    return await this.userRepository.updateOne(_id, data);
  }

  async updatePassword(_id: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return await this.userRepository.updateOne(_id, {
      password: hash,
    });
  }

  async deleteUser(_id: string) {
    return await this.userRepository.delete(_id);
  }
}
