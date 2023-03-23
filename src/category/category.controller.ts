import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    const isCategoryFound = await this.categoryService.findOneByName(
      createCategoryDTO.categoryName,
    );
    if (isCategoryFound) throw new ConflictException('tag already exist');
    return await this.categoryService.create(createCategoryDTO.categoryName);
  }
}
