import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/product.entity';
import { Rate } from 'src/rate/rate.entity';
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
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @ManyToMany(() => Role)
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @ManyToMany(() => Product)
  @JoinTable({ name: 'favorites' })
  favorites: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
