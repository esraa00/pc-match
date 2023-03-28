import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import { VoteType } from 'src/vote-type/vote-type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Question, (question) => question.votes)
  question: Question;

  @OneToMany(() => VoteType, (voteType) => voteType.votes)
  type: VoteType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
