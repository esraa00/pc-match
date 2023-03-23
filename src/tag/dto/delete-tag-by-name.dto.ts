import { IsAlpha } from 'class-validator';

export class DeleteTagByNameDTO {
  @IsAlpha()
  tagName: string;
}
