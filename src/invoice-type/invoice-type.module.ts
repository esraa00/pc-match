import { Module } from '@nestjs/common';
import { InvoiceTypeController } from './invoice-type.controller';
import { InvoiceTypeService } from './invoice-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceType } from './invoice-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceType])],
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService],
  exports: [InvoiceTypeService],
})
export class InvoiceTypeModule {}
