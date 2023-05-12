import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentType } from './payment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  providers: [PaymentTypeService],
  controllers: [PaymentTypeController],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
