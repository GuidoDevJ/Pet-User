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
      delete newUser._id;
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
    console.log(id);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
