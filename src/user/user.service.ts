/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userDB: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    try {
      const newUser = await this.userDB.create(createUserDto);
      console.log('soy el newuser', newUser);
      return {
        userId: newUser._id,
      };
    } catch (error) {
      return error.response;
    }
    return 'This action adds a new user';
  }

  async findAllPetsByUserId(id: string) {
    try {
      const user = await this.userDB.findById(id);
      if (!user) throw new HttpException('User not found', 401);
      return {
        pets: user.pets,
      };
    } catch (error) {
      return error.response;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userDB.findById(id);
      if (!user) throw new HttpException('User not found', 401);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userDB.findByIdAndUpdate(id, updateUserDto);
      return { msg: 'Update success' };
    } catch (error) {
      throw new HttpException({ msg: error.response }, 401);
    }
  }

  async remove(id: string) {
    try {
      await this.userDB.findByIdAndDelete(id);
      return { msg: 'Delete success' };
    } catch (error) {
      throw new HttpException({ msg: error.response }, 401);
    }
  }
}
