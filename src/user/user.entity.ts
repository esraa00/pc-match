import { Answer } from 'src/answer/answer.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { FavoriteList } from 'src/favorite-list/entities/favorite-list.entity';
import { Question } from 'src/question/question.entity';
import { Product } from 'src/product/product.entity';
import { Vote } from 'src/vote/vote.entity';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToOne(() => FavoriteList, (favoriteList) => favoriteList.user)
  favoriteList: FavoriteList;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
