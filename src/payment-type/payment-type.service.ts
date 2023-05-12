import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from './payment-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType) private repo: Repository<PaymentType>,
  ) {}

  async create(type: string) {
    const createdType = this.repo.create({ type });
    return await this.repo.save(createdType);
  }

  async findOneByName(type: string) {
    return await this.repo.findOneBy({ type });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async deleteByName(type: string) {
    return await this.repo.delete({ type });
  }

  async update(id: number, type: string) {
    const typeFound = await this.findOneById(id);
    if (!typeFound) throw new NotFoundException('type not found');
    Object.assign(typeFound, { type });
    return await this.repo.save(typeFound);
  }
}
