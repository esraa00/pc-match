import { IsAlpha } from 'class-validator';

export class DeleteCategoryByNameDTO {
  @IsAlpha()
  categoryName: string;
}
