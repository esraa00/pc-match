import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { CartItemService } from './cart-item.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get(':userId')
  async getCartItems(@Param('userId') userId: number) {
    return await this.cartItemService.find(userId);
  }

  @Post('/')
  async addToCart(@Body() body: AddToCartDTO) {
    return await this.cartItemService.create(
      body.userId,
      body.productId,
      body.quantity,
    );
  }

  @Delete(':cartItemId')
  async deleteFromCart(@Param('cartItemId') cartItemId: number) {
    return await this.cartItemService.deleteById(cartItemId);
  }
}
