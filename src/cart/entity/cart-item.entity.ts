import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  productId: number;

  @Column()
  cartId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
