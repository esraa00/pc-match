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
  JoinColumn,
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

  @Column({ type: 'json', nullable: true })
  specifications: Record<string, any>;

  @Column()
  image: string;

  @Column({ nullable: true, type: 'double precision' })
  discountAmount: number;

  @Column({ type: 'timestamptz', nullable: true })
  discountExpiryDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ referencedColumnName: 'id' })
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'product_tag' })
  tags: Tag[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'product_subscribers' })
  subscribers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
