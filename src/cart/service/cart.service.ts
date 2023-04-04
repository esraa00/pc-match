import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async create(userId: number) {
    const cart = this.repo.create({ userId });
    return await this.repo.save(cart);
  }
}
