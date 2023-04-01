import { IsNumber } from 'class-validator';

export class AddToCartDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
