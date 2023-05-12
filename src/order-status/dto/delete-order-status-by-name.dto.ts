import { IsAlpha } from 'class-validator';

export class DeleteOrderStatusByNameDTO {
  @IsAlpha()
  orderStatus: string;
}
