import { IsAlpha } from 'class-validator';

export class CreateOrderStatusDTO {
  @IsAlpha()
  orderStatus: string;
}
