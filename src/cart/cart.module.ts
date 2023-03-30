import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';
import { CartItem } from './entities/cart-item.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  exports: [CartService],
})
export class CartModule {}
