import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './order-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatus) private repo: Repository<OrderStatus>,
  ) {}

  async create(status: string) {
    const createdStatus = this.repo.create({ status });
    return await this.repo.save(createdStatus);
  }

  async findOneByName(status: string) {
    return await this.repo.findOneBy({ status });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async deleteByName(status: string) {
    return await this.repo.delete({ status });
  }

  async update(id: number, orderStatus: string) {
    const orderStatusFound = await this.findOneById(id);
    if (!orderStatusFound) throw new NotFoundException('user not found');
    Object.assign(orderStatusFound, { orderStatus });
    return await this.repo.save(orderStatusFound);
  }
}
