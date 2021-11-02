import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';

// User Service
@Injectable()
export default class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //Create User Method
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  //Get User Method
  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  //Update user method
  async update(id, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  //Delete user mothod
  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
