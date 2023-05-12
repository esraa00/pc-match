import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { QuestionService } from './question.service';
import { CreateQuestionDTO } from './dto/create-question.dto';

@Controller('/product/:productId/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseAccessTokenGuard()
  @Post('/')
  async createQuestion(
    @GetCurrentUser('userId') userId: number,
    @Param('productId') productId: number,
    @Body() createQuestionDTO: CreateQuestionDTO,
  ) {
    const question = await this.questionService.create(
      userId,
      productId,
      createQuestionDTO.question,
    );
    return question;
  }

  @UseAccessTokenGuard()
  @Delete('/:questionId')
  async deleteQuestion(
    @GetCurrentUser('userId') userId: number,
    @Param('questionId') questionId: number,
  ) {
    const question = await this.questionService.delete(userId, questionId);
    return question;
  }

  @Get('/')
  async getAllQuestions(@Param('productId') productId: number) {
    const questions = await this.questionService.findByProductIdWithJoins(
      productId,
    );
    return questions;
  }

  //TODO : needs to be fixed
  @Get('/:questionId')
  async getQuestionById(@Param('questionId') questionId: number) {
    const question = await this.questionService.findOneById(questionId);
    return question;
  }
}
