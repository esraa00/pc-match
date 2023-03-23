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
}
