import { Controller, Post, NotFoundException } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CategoryService } from 'src/category/category.service';
import { GetCurrentUser } from 'src/decorators';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { createProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor() // private readonly productService: ProductService,
  // private readonly tagService: TagService,
  // private readonly categoryService: CategoryService,
  // private readonly userService: UserService,
  {}
  // @Post('/')
  // async create(
  //   @Body() createProductDTO: createProductDTO,
  //   @GetCurrentUser('userId') userId: number,
  // ) {
  //   const category = await this.categoryService.findOneByName(
  //     createProductDTO.category,
  //   );
  //   if (!category) throw new NotFoundException('category was not found');

  //   const tags = await this.tagService.findManyByName(createProductDTO.tags);
  //   if (!tags) throw new NotFoundException('tags was not found');

  //   const user = await this.userService.findOneById(userId);
  //   if (!user) throw new NotFoundException('user was not found');

  // await this.productService.create({
  //   ...createProductDTO,
  //   user,
  //   category,
  //   tags,
  // });
}
// }
