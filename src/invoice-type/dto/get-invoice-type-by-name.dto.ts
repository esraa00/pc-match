import { IsAlpha } from 'class-validator';

export class GetInvoiceTypeByNameDTO {
  @IsAlpha()
  invoiceType: string;
}
