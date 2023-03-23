import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}

  async findOneByName(tagName: string) {
    return await this.repo.findOneBy({ tagName });
  }
}
