import { Vote } from 'src/vote/vote.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class VoteType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  type: string;

  @ManyToOne(() => Vote, (vote) => vote.type)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
