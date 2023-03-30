import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';

@Module({
  providers: [PaymentTypeService],
  controllers: [PaymentTypeController]
})
export class PaymentTypeModule {}
