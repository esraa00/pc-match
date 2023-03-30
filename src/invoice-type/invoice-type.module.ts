import { Module } from '@nestjs/common';
import { InvoiceTypeController } from './invoice-type.controller';
import { InvoiceTypeService } from './invoice-type.service';

@Module({
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService]
})
export class InvoiceTypeModule {}
