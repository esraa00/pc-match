import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateController } from './rate.controller';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RateController],
  providers: [RateService],
  imports: [TypeOrmModule.forFeature([Rate]), ProductModule, UserModule],
})
export class RateModule {}
