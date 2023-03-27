import { Module } from '@nestjs/common';
import { QuestionsVotingService } from './vote.service';
import { QuestionsVotingController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';

@Module({
  providers: [QuestionsVotingService],
  controllers: [QuestionsVotingController],
  imports: [TypeOrmModule.forFeature([Vote])],
})
export class QuestionsVotingModule {}
