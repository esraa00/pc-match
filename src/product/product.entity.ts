import { CartItem } from 'src/cart/entities/cart-item.entity';
import { Category } from 'src/category/category.entity';
import { Question } from 'src/question/question.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'json' })
  specifications: Record<string, any>;

  @Column()
  image: string;

  @Column({ nullable: true })
  discountAmount: number;

  @Column({ type: 'timestamptz', nullable: true })
  discountExpiryDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'product_tag' })
  tags: Tag[];

  @OneToMany(() => Question, (question) => question.product)
  questions: Question[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'product_subscribers' })
  subscribers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
