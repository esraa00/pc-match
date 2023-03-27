import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';

@Module({
  providers: [AnswerService],
  controllers: [AnswerController],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule {}
