import { Injectable } from '@nestjs/common';
import { CreateRateDTO } from './dto/create-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(@InjectRepository(Rate) private rateRepo: Repository<Rate>) {}
  async create({ userId, productId, rate, comment }: CreateRateDTO) {
    const createdRate = this.rateRepo.create({
      userId,
      productId,
      rate,
      comment,
    });
    await this.rateRepo.save(createdRate);
  }

  async get() {
    return await this.rateRepo.find({ relations: ['user', 'product'] });
  }
}
