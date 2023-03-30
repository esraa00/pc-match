import { OrderStatus } from 'src/order-status/order-status.entity';
import { Order } from 'src/order/order.entity';
import { PaymentType } from 'src/payment-type/payment-type.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'double precision' })
  price: number;

  @ManyToOne(() => Order)
  @JoinColumn({ referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
