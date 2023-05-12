import { IsAlpha } from 'class-validator';

export class DeletePaymentTypeByNameDTO {
  @IsAlpha()
  paymentType: string;
}
