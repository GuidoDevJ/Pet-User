/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';

@Schema()
export class User {
  @Prop({ type: String, validate: IsMongoId })
  authId: string;
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  location: string;
  @Prop({ type: String })
  phone: string;
  @Prop({ type: Array })
  pets: [any];
}

export const UserSchema = SchemaFactory.createForClass(User);
