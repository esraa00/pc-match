import { IsString } from 'class-validator';

export class CreateAnswerDTO {
  @IsString()
  answer: string;
}
