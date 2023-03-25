import { Category } from 'src/category/category.entity';
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
  specifications: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  discountAmount: number;

  @Column({ type: 'timestamptz', nullable: true })
  discountExpiryDate: Date;

  @OneToMany(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'product_tag' })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
