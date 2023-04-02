import { IsNumber } from 'class-validator';

export class DeleteFromFavoritesDTO {
  @IsNumber()
  productId: number;
}
