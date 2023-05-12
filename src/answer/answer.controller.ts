import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { AnswerService } from './answer.service';
import { CreateAnswerDTO } from './dto/create-answer.dto';

@Controller('products/:productId/questions/:questionId/Answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseAccessTokenGuard()
  @Post('/')
  async createAnswer(
    @GetCurrentUser('userId') userId: number,
    @Param('questionId') questionId: number,
    @Body() createAnswerDTO: CreateAnswerDTO,
  ) {
    //TODO : make user able to write an answer if he really bought the product
    const answerCreated = await this.answerService.create(
      userId,
      questionId,
      createAnswerDTO.answer,
    );
    return answerCreated;
  }

  @Get('/')
  async getAllAnswersOnQuestion(@Param('questionId') questionId: number) {
    const answers = await this.answerService.findByQuestionId(questionId);
    return answers;
  }
}
