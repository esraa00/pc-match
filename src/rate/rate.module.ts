import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingController } from './rate.controller';
import { Rate } from './rate.entity';
import { ProductRatingService } from './rate.service';

@Module({
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
  imports: [TypeOrmModule.forFeature([Rate])],
})
export class RateModule {}
