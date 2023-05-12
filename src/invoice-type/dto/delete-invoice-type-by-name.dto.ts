import { IsAlpha } from 'class-validator';

export class DeleteInvoiceTypeByNameDTO {
  @IsAlpha()
  invoiceType: string;
}
