/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  @IsString()
  authId: string;
  @IsString()
  name: string;
  @IsString()
  location: string;
  @IsNumber()
  phone: number;
  @IsArray()
  @IsOptional()
  pets: [any];
}
