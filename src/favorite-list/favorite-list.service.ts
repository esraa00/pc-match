// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// // import { ProductService } from 'src/product/product.service';
// import { FavoriteList } from './entities/favorite-list.entity';

// @Injectable()
// export class FavoriteListService {
//   constructor(
//     @InjectRepository(FavoriteList) private repo: Repository<FavoriteList>,
//   ) // private readonly productService: ProductService,
//   {}
//   async create() {
//     const favoriteList = this.repo.create();
//     return await this.repo.save(favoriteList);
//   }

//   async findOneById(id: number) {
//     return await this.repo.findOneBy({ id });
//   }

//   // async addToFavoriteList(productId: number, favoriteListId: number) {
//   //   const favoriteList = await this.findOneById(favoriteListId);
//   //   const product = await this.productService.findOneById(productId);
//   //   favoriteList.favoriteListItems.push(product);
//   // }
// }
