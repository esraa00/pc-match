import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';

@Module({
  providers: [OrderStatusService],
  controllers: [OrderStatusController]
})
export class OrderStatusModule {}
