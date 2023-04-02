import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { FavoriteListService } from './favorite-list.service';
import { UseAccessTokenGuard } from 'src/guards';
import { GetCurrentUser } from 'src/decorators';
import { AddToFavoritesDTO } from './dto/add-to-favorites.dto';
import { DeleteFromFavoritesDTO } from './dto/delete-from-favorites.dto';

@Controller('favorites')
export class FavoriteListController {
  constructor(private readonly favoriteListService: FavoriteListService) {}

  @UseAccessTokenGuard()
  @Post('/')
  async addToFavorites(
    @GetCurrentUser('userId') currentUserId: number,
    @Body() addToFavoritesDTO: AddToFavoritesDTO,
  ) {
    return await this.favoriteListService.addToFavorites(
      currentUserId,
      addToFavoritesDTO.productId,
    );
  }

  @UseAccessTokenGuard()
  @Delete('/:id')
  async deleteFromFavorites(
    @GetCurrentUser('userId') currentUserId: number,
    @Param() deleteFromFavoritesDTO: DeleteFromFavoritesDTO,
  ) {
    return await this.favoriteListService.deleteFromFavorites(
      currentUserId,
      deleteFromFavoritesDTO.id,
    );
  }

  @UseAccessTokenGuard()
  @Get('/')
  async getAllFavorites(@GetCurrentUser('userId') currentUserId: number) {
    return await this.favoriteListService.getAllFavorites(currentUserId);
  }
}
