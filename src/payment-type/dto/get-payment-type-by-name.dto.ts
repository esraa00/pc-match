import { IsAlpha } from 'class-validator';

export class GetPaymentTypeByNameDTO {
  @IsAlpha()
  paymentType: string;
}
