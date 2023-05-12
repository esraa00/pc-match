import { IsAlpha } from 'class-validator';

export class CreateInvoiceTypeDTO {
  @IsAlpha()
  invoiceType: string;
}
