import { IsAlpha } from 'class-validator';

export class CreatePaymentTypeDTO {
  @IsAlpha()
  paymentType: string;
}
