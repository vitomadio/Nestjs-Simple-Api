import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Config from './config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
console.log(Config.mongo_uri);

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(Config.mongo_uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
