import { IsAlpha } from 'class-validator';

export class GetOrderStatusByNameDTO {
  @IsAlpha()
  orderStatus: string;
}
