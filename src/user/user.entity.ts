import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/product.entity';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column({ unique: true, nullable: true })
  facebookId: string;

  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'favorite_list_items' })
  favorites: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
