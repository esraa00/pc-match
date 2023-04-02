import { IsNumber } from 'class-validator';

export class AddToFavoritesDTO {
  @IsNumber()
  productId: number;
}
