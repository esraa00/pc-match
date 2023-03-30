import { InvoiceType } from 'src/invoice-type/invoice-type.entity';
import { OrderStatus } from 'src/order-status/order-status.entity';
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
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ type: 'double precision' })
  totalPrice: number;

  @Column({ type: 'double precision' })
  cuponDiscountPercent: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => PaymentType)
  @JoinColumn({ referencedColumnName: 'id' })
  paymentType: PaymentType;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ referencedColumnName: 'id' })
  status: OrderStatus;

  @ManyToMany(() => InvoiceType)
  @JoinTable({ name: 'order-invoice-type' })
  invoicesTypes: InvoiceType[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
