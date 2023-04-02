import { IsNumber } from 'class-validator';

export class DeleteFromFavoritesDTO {
  @IsNumber()
  id: number;
}
