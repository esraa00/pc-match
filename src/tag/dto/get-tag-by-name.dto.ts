import { IsAlpha } from 'class-validator';

export class GetTagByNameDTO {
  @IsAlpha()
  tagName: string;
}
