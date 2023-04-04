import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateController } from './rate.controller';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Module({
  controllers: [RateController],
  providers: [RateService],
  imports: [TypeOrmModule.forFeature([Rate])],
})
export class RateModule {}
