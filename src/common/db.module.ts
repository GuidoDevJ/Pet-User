/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
})
export class MongoDbModule {}
