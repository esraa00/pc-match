import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceTypeService } from './invoice-type.service';
import { CreateInvoiceTypeDTO } from './dto/create-invoice-type.dto';
import { GetInvoiceTypeByNameDTO } from './dto/get-invoice-type-by-name.dto';
import { DeleteInvoiceTypeByNameDTO } from './dto/delete-invoice-type-by-name.dto';

import { Roles } from 'src/decorators';

@Controller('invoice-type')
export class InvoiceTypeController {
  constructor(private readonly invoiceTypeService: InvoiceTypeService) {}

  @Post()
  async createInvoiceType(@Body() createInvoiceType: CreateInvoiceTypeDTO) {
    const isInvoiceTypeFound = await this.invoiceTypeService.findOneByName(
      createInvoiceType.invoiceType,
    );
    if (isInvoiceTypeFound)
      throw new ConflictException('invoice type already exist');
    return await this.invoiceTypeService.create(createInvoiceType.invoiceType);
  }

  @Get('/:invoiceType')
  async getInvoiceTypeByName(
    @Param() getInvoiceTypeByName: GetInvoiceTypeByNameDTO,
  ) {
    const invoiceType = await this.invoiceTypeService.findOneByName(
      getInvoiceTypeByName.invoiceType,
    );
    if (!invoiceType) throw new NotFoundException('invoice type was not found');
    return await this.invoiceTypeService.findOneByName(
      getInvoiceTypeByName.invoiceType,
    );
  }

  @Get()
  @Roles(['admin'])
  async getAllInvoiceTypes() {
    return await this.invoiceTypeService.find();
  }

  @Delete('/:invoiceType')
  async deleteInvoiceTypeByName(
    @Param() deleteInvoiceTypeByName: DeleteInvoiceTypeByNameDTO,
  ) {
    const invoiceType = await this.invoiceTypeService.findOneByName(
      deleteInvoiceTypeByName.invoiceType,
    );
    if (!invoiceType)
      throw new NotFoundException('no invoice type found to delete');
    return await this.invoiceTypeService.deleteByName(
      deleteInvoiceTypeByName.invoiceType,
    );
  }
}
