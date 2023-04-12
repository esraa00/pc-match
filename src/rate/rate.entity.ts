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
  Index,
} from 'typeorm';

@Entity()
@Index(['userId', 'productId'], { unique: true })
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column({ type: 'int' })
  rate: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
