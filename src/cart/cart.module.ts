import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartItemService],
  imports: [TypeOrmModule.forFeature([CartItem])],
  exports: [CartItemService],
})
export class CartModule {}
