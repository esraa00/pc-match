import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDTO } from './dto/create-payment-type.dto';
import { GetPaymentTypeByNameDTO } from './dto/get-payment-type-by-name.dto';
import { DeletePaymentTypeByNameDTO } from './dto/delete-payment-type-by-name.dto';

import { Roles } from 'src/decorators';

@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  async createPaymentType(@Body() createPaymentType: CreatePaymentTypeDTO) {
    const isPaymentTypeFound = await this.paymentTypeService.findOneByName(
      createPaymentType.paymentType,
    );
    if (isPaymentTypeFound)
      throw new ConflictException('payment type already exist');
    return await this.paymentTypeService.create(createPaymentType.paymentType);
  }

  @Get('/:paymentType')
  async getPaymentTypeByName(
    @Param() getPaymentTypeByName: GetPaymentTypeByNameDTO,
  ) {
    const paymentType = await this.paymentTypeService.findOneByName(
      getPaymentTypeByName.paymentType,
    );
    if (!paymentType) throw new NotFoundException('payment type was not found');
    return await this.paymentTypeService.findOneByName(
      getPaymentTypeByName.paymentType,
    );
  }

  @Get()
  @Roles(['admin'])
  async getAllPaymentTypes() {
    return await this.paymentTypeService.find();
  }

  @Delete('/:paymentType')
  async deletePaymentTypeByName(
    @Param() deletePaymentTypeByName: DeletePaymentTypeByNameDTO,
  ) {
    const paymentType = await this.paymentTypeService.findOneByName(
      deletePaymentTypeByName.paymentType,
    );
    if (!paymentType)
      throw new NotFoundException('no payment type found to delete');
    return await this.paymentTypeService.deleteByName(
      deletePaymentTypeByName.paymentType,
    );
  }
}
