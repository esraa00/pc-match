import { IsString } from 'class-validator';

export class createTagDTO {
  @IsString()
  tagName: string;
}
