import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { CreateTagDTO } from './dto/Create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() createTagDTO: CreateTagDTO) {
    const isTagFound = await this.tagService.findOneByName(
      createTagDTO.tagName,
    );
    if (isTagFound) throw new ConflictException('tag already exist');
    return await this.tagService.create(createTagDTO.tagName);
  }
}
