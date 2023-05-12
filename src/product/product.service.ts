import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  async create(
    user: number,
    category: string,
    tag: string[],
    productName: string,
    quantity: number,
    price: number,
    specifications: Record<string, any>,
    image: string,
    discountAmount: number,
    discountExpiryDate: string,
  ) {
    const userFound = await this.userService.findOneById(user);
    if (!userFound) throw new NotFoundException('user not found');
    const categoryFound = await this.categoryService.findOneByName(category);
    if (!categoryFound) throw new NotFoundException('category not found');
    const tagsFound = await this.tagService.findManyByName(tag);
    console.log(tagsFound);
    if (!tagsFound) throw new NotFoundException('tag was not found');
    const createdProduct = this.repo.create({
      productName,
      quantity,
      price,
      specifications,
      image,
      discountAmount,
      discountExpiryDate: new Date(discountExpiryDate),
      user: userFound,
      category: categoryFound,
      tags: tagsFound,
    });
    return await this.repo.save(createdProduct);
  }

  async findOneByIdWithJoins(id: number) {
    return await this.repo.findOne({
      relations: ['category', 'user', 'tags'],
      where: { id },
    });
  }

  async findOneById(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async find() {
    return await this.repo.find({ relations: ['user', 'category', 'tags'] });
  }

  async deleteOneById(id: number) {
    return await this.repo.delete(id);
  }

  async update(
    userId: number,
    productId: number,
    data: Partial<createProductDTO>,
  ) {
    const productFound = await this.findOneById(productId);
    if (!productFound) throw new NotFoundException('product not found');
    if (userId != productFound.user.id)
      throw new UnauthorizedException('you are not the owner');
    Object.assign(productFound, data);
    return await this.repo.save(productFound);
  }
}
