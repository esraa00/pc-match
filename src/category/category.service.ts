import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(categoryName: string) {
    const category = this.repo.create({ categoryName });
    return await this.repo.save(category);
  }

  async findOneByName(categoryName: string) {
    return await this.repo.findOneBy({ categoryName });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async deleteByName(categoryName: string) {
    return await this.repo.delete({ categoryName });
  }
}
