import { Module } from '@nestjs/common';
import { FavoriteListController } from './favorite-list.controller';
import { FavoriteListService } from './favorite-list.service';

@Module({
  controllers: [FavoriteListController],
  providers: [FavoriteListService]
})
export class FavoriteListModule {}
