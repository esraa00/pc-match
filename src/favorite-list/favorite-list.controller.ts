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

@Controller('favorite-list')
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
  @Delete('/:productId')
  async deleteFromFavorites(
    @GetCurrentUser('userId') currentUserId: number,
    @Param() deleteFromFavoritesDTO: DeleteFromFavoritesDTO,
  ) {
    return await this.favoriteListService.deleteFromFavorites(
      currentUserId,
      deleteFromFavoritesDTO.productId,
    );
  }

  @UseAccessTokenGuard()
  @Get('/:userId')
  async getAllFavorites(
    @GetCurrentUser('userId') currentUserId: number,
    @Param('userId') userId: number,
  ) {
    if (userId != currentUserId)
      throw new UnauthorizedException(
        'this is not your favorite list , stop playing',
      );
    return await this.favoriteListService.getAllFavorites(userId);
  }
}
