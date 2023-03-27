import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartItem } from './entities/cart-item.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
})
export class CartModule {}
