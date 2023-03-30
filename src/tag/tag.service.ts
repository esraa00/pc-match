import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}

  async create(tagName: string) {
    const tag = this.repo.create({ tagName });
    return await this.repo.save(tag);
  }

  async findOneByName(tagName: string) {
    console.log(tagName);
    const tag = await this.repo.findOneBy({ tagName });
    console.log(tag);
    return tag;
  }

  // async findManyByName(tags: string[]): Promise<Tag[]> {
  //   const foundTags = tags.map(async (tagName: string) => {
  //     const tag = await this.findOneByName(tagName);
  //     return tag;
  //   });
  //   return foundTags;
  // }

  async findManyByName(tag: string[]) {
    const foundTags = await this.repo.find({ where: { tagName: In(tag) } });
    return foundTags;
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async delete(tagName: string) {
    return await this.repo.delete({ tagName });
  }
}
