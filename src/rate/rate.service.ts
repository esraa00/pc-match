import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRateDTO } from './dto/create-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private rateRepo: Repository<Rate>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async create(userId: number, { productId, rate, comment }: CreateRateDTO) {
    const userFound = await this.userService.findOneById(userId);
    if (!userFound) throw new NotFoundException('user not found');

    const productFound = await this.productService.findOneById(productId);
    if (!productFound) throw new NotFoundException('product not found');

    const createdRate = this.rateRepo.create({
      userId,
      productId,
      rate,
      comment,
    });

    await this.rateRepo.save(createdRate);
  }

  async deleteById(userId: number, rateId: number) {
    const userFound = await this.userService.findOneById(userId);
    if (!userFound) throw new NotFoundException('user not found');

    const rateFound = await this.findOneById(rateId);
    if (!rateFound) throw new NotFoundException('rate not found');

    return await this.rateRepo.delete({ id: rateId });
  }

  async find() {
    return await this.rateRepo.find();
  }

  async findWithRelations() {
    return await this.rateRepo.find({ relations: ['user', 'product'] });
  }

  async findOneById(id: number) {
    return await this.rateRepo.findOneBy({ id });
  }

  async update(id: number, userId: number, rate?: number, comment?: string) {
    const rateFound = await this.findOneById(id);
    if (rateFound.userId != userId)
      throw new UnauthorizedException("don't play with other's rate");

    if (!rateFound) throw new NotFoundException('rate not found');
    Object.assign(rateFound, { rate, comment });
    return await this.rateRepo.save(rateFound);
  }
}
