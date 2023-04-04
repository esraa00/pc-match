import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartItem } from './entity/cart-item.entity';
import { CartItemService } from './service/cart-item.service';
import { CartController } from './controller/cart.controller';
import { Cart } from './entity/cart.entity';

@Module({
  controllers: [CartController],
  providers: [CartItemService],
  imports: [TypeOrmModule.forFeature([CartItem, Cart])],
  exports: [CartItemService],
})
export class CartModule {}
