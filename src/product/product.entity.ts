import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'json' })
  specifications: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  discountAmount: string;

  @Column({ default: false })
  discountExpiryDate: boolean;

  @Column({ unique: true, nullable: true })
  userId: string;

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
