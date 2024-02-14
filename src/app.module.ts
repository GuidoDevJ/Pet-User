import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigModule } from './common/config.module';
import { MongoDbModule } from './common/db.module';

@Module({
  imports: [UserModule, ConfigModule, MongoDbModule],
})
export class AppModule {}
