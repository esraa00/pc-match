import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { FavoriteListController } from './favorite-list.controller';
import { FavoriteListService } from './favorite-list.service';

@Module({
  controllers: [FavoriteListController],
  providers: [FavoriteListService],
  imports: [UserModule, ProductModule],
  exports: [FavoriteListService],
})
export class FavoriteListModule {}
