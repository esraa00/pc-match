import { IsNumber } from 'class-validator';

export class GetAllFavoritesDTO {
  @IsNumber()
  userId: number;
}
