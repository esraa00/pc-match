import {
  Controller,
  Post,
  Get,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Body, Delete, Param, Put } from '@nestjs/common/decorators';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { createProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseAccessTokenGuard()
  @Post('/')
  async create(
    @Body() createProductDTO: createProductDTO,
    @GetCurrentUser('userId') userId: number,
  ) {
    const createdProduct = await this.productService.create(
      userId,
      createProductDTO.category,
      createProductDTO.tags,
      createProductDTO.productName,
      createProductDTO.quantity,
      createProductDTO.price,
      createProductDTO.specifications,
      createProductDTO.image,
      createProductDTO.discountAmount,
      createProductDTO.discountExpiryDate,
    );
    return createdProduct;
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    const productFound = await this.productService.findOneById(id);
    if (!productFound) throw new NotFoundException('product not found');
    return productFound;
  }

  @Get('/')
  async getAll() {
    const productsFound = await this.productService.find();
    return productsFound;
  }

  @UseAccessTokenGuard()
  @Delete('/:id')
  async deleteOneById(
    @Param('id') id: number,
    @GetCurrentUser('userId') userId: number,
  ) {
    const productFound = await this.productService.findOneById(id);
    if (!productFound)
      throw new NotFoundException("there's no product to delete");
    if (productFound.user.id != userId)
      throw new UnauthorizedException('bas y baba');
    await this.productService.deleteOneById(id);
  }

  @UseAccessTokenGuard()
  @Put('/:id')
  async updateProduct(
    @Param('id') id: number,
    @GetCurrentUser('userId') userId: number,
    @Body() body: Partial<createProductDTO>,
  ) {
    return await this.productService.update(userId, id, body);
  }
}
