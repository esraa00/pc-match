import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}
  async find(userId: number) {
    const cartItems = await this.repo.find({
      relations: ['product'],
      where: { userId },
    });
    return cartItems;
  }

  async create(userId: number, productId: number, quantity?: number) {
    if (!quantity) quantity = 1;
    const cartItem = this.repo.create({ userId, productId, quantity });
    return await this.repo.save(cartItem);
  }

  async deleteById(id: number) {
    return await this.repo.delete({ id });
  }
}
