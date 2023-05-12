import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Roles } from 'src/decorators';

import { OrderStatusService } from './order-status.service';
import { CreateOrderStatusDTO } from './dto/create-order-status.dto';
import { GetOrderStatusByNameDTO } from './dto/get-order-status-by-name.dto';
import { DeleteOrderStatusByNameDTO } from './dto/delete-order-status-by-name.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  async createOrderStatus(@Body() createOrderStatusDTO: CreateOrderStatusDTO) {
    const isOrderStatusFound = await this.orderStatusService.findOneByName(
      createOrderStatusDTO.orderStatus,
    );
    if (isOrderStatusFound)
      throw new ConflictException('order status already exist');
    return await this.orderStatusService.create(
      createOrderStatusDTO.orderStatus,
    );
  }

  @Get('/:orderStatus')
  async getOrderStatusByName(
    @Param() getOrderStatusByName: GetOrderStatusByNameDTO,
  ) {
    const orderStatus = await this.orderStatusService.findOneByName(
      getOrderStatusByName.orderStatus,
    );
    if (!orderStatus) throw new NotFoundException('order status was not found');
    return await this.orderStatusService.findOneByName(
      getOrderStatusByName.orderStatus,
    );
  }

  @Get()
  @Roles(['admin'])
  async getAllOrderStatus() {
    const orderStatus = await this.orderStatusService.find();
    return orderStatus;
  }

  @Delete('/:orderStatus')
  async deleteOrderStatusByName(
    @Param() deleteOrderStatusByName: DeleteOrderStatusByNameDTO,
  ) {
    const orderStatus = await this.orderStatusService.findOneByName(
      deleteOrderStatusByName.orderStatus,
    );
    if (!orderStatus)
      throw new NotFoundException('no order status found to delete');
    return await this.orderStatusService.deleteByName(
      deleteOrderStatusByName.orderStatus,
    );
  }
}
