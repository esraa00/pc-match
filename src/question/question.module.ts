import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [TypeOrmModule.forFeature([Question]), UserModule, ProductModule],
})
export class QuestionsModule {}
