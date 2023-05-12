import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Param,
  Delete,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators';
import { CreateTagDTO } from './dto/create-tag.dto';
import { DeleteTagByNameDTO } from './dto/delete-tag-by-name.dto';
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

  @Get()
  @Roles(['admin'])
  async getAllTags() {
    const tags = await this.tagService.find();
    return tags;
  }

  @Delete('/:tagName')
  async deleteTagByName(@Param() deleteTagByNameDTO: DeleteTagByNameDTO) {
    const tag = await this.tagService.findOneByName(deleteTagByNameDTO.tagName);
    if (!tag) throw new NotFoundException('no tag found to delete');
    return await this.tagService.delete(deleteTagByNameDTO.tagName);
  }
}
