import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Param,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateTagDTO } from './dto/Create-tag.dto';
import { GetTagByNameDTO } from './dto/get-tag-by-name.dto';
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

  @Get('/:tagName')
  async getTagByName(@Param() getTagByNameDTO: GetTagByNameDTO) {
    const tag = await this.tagService.findOneByName(getTagByNameDTO.tagName);
    if (!tag) throw new NotFoundException('tag was not found');
    return await this.tagService.findOneByName(getTagByNameDTO.tagName);
  }
}
