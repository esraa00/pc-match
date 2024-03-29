import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateRateDTO {
  @IsInt()
  productId: number;

  @IsInt()
  @IsEnum([1, 2, 3, 4, 5])
  rate: number;

  @IsString()
  comment: string;
}
