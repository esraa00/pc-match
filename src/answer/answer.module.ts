import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { UserModule } from 'src/user/user.module';
import { QuestionsModule } from 'src/question/question.module';

@Module({
  providers: [AnswerService],
  controllers: [AnswerController],
  imports: [TypeOrmModule.forFeature([Answer]), UserModule, QuestionsModule],
})
export class AnswerModule {}
