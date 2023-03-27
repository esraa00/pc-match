import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRatingController } from './product-rating.controller';
import { ProductRating } from './product-rating.entity';
import { ProductRatingService } from './product-rating.service';

@Module({
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
  imports: [TypeOrmModule.forFeature([ProductRating])],
})
export class ProductRatingModule {}
