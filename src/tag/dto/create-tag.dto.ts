import { IsAlpha } from 'class-validator';

export class CreateTagDTO {
  @IsAlpha()
  tagName: string;
}
