import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FavoriteListService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async addToFavorites(userId: number, productId: number) {
    const user = await this.userService.findOneByIdWithJoin(userId);
    const product = await this.productService.findOneById(productId);

    if (this.isProductInFavorites(user, product)) {
      throw new ConflictException('product is already in your favorites');
    }
    user.favorites.push(product);
    return await this.userService.saveUser(user);
  }

  async deleteFromFavorites(userId: number, productId: number) {
    const user = await this.userService.findOneByIdWithJoin(userId);
    const product = await this.productService.findOneById(productId);

    if (!this.isProductInFavorites(user, product))
      throw new NotFoundException('product is not in favorites to delete it');

    const newFavorites = this.excludeProductFromFavorites(user, product);
    user.favorites = newFavorites;
    return await this.userService.saveUser(user);
  }

  async getAllFavorites(userId: number) {
    const user = await this.userService.findOneByIdWithJoin(userId);
    return user.favorites;
  }

  excludeProductFromFavorites(user: User, product: Product) {
    const favorites = (user.favorites = user.favorites.filter(
      (favoriteItem) => {
        return favoriteItem.id != product.id;
      },
    ));
    return favorites;
  }

  isProductInFavorites(user: User, product: Product): Product {
    const [productFound] = user.favorites.filter((favoriteListItem) => {
      if (favoriteListItem.id == product.id) return favoriteListItem;
    });
    return productFound;
  }
}
