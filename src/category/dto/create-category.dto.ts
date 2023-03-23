import { IsAlpha } from 'class-validator';

export class CreateCategoryDTO {
  @IsAlpha()
  categoryName: string;
}
