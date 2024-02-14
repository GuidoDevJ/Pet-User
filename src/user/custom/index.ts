/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class MongoDBID implements PipeTransform {
  constructor(
    @InjectModel(User.name)
    private readonly userDB: Model<User>,
  ) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) throw new HttpException('Id no valido', 500);

    return value;
  }
}
