import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { GetCategoryByNameDTO } from './dto/get-category-by-name.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    const isCategoryFound = await this.categoryService.findOneByName(
      createCategoryDTO.categoryName,
    );
    if (isCategoryFound) throw new ConflictException('category already exist');
    return await this.categoryService.create(createCategoryDTO.categoryName);
  }

  @Get('/:categoryName')
  async getCategoryByName(@Param() getCategoryByNameDTO: GetCategoryByNameDTO) {
    const category = await this.categoryService.findOneByName(
      getCategoryByNameDTO.categoryName,
    );
    if (!category) throw new NotFoundException('category was not found');
    return await this.categoryService.findOneByName(
      getCategoryByNameDTO.categoryName,
    );
  }

  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.find();
    return categories;
  }
}
