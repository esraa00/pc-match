import { IsAlpha } from 'class-validator';

export class GetCategoryByNameDTO {
  @IsAlpha()
  categoryName: string;
}
