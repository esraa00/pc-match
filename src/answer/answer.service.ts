import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private repo: Repository<Answer>,
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
  ) {}

  async create(userId: number, questionId: number, answer: string) {
    const userFound = await this.userService.findOneById(userId);
    if (!userFound) throw new NotFoundException('user not found');

    const questionFound = await this.questionService.findOneById(questionId);
    if (!questionFound) throw new NotFoundException('question not found');

    const createdAnswer = this.repo.create({ questionId, userId, answer });
    return await this.repo.save(createdAnswer);
  }

  async findByQuestionId(questionId: number) {
    const question = await this.questionService.findOneById(questionId);
    if (!question) throw new NotFoundException('question was not found');

    const answers = await this.repo.find({
      relations: ['question', 'user'],
      where: { questionId },
    });
    return answers;
  }
}
