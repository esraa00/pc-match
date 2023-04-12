import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Question } from './question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async createQuestion(
    userId: number,
    productId: number,
    question: string,
  ): Promise<Question> {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productService.findOneById(productId);
    if (!product) throw new NotFoundException('User not found');

    const questionCreated = this.questionRepo.create({
      user,
      product,
      question,
    });

    return await this.questionRepo.save(questionCreated);
  }

  async deleteQuestion(userId: number, questionId: number): Promise<void> {
    const question = await this.questionRepo.delete({
      id: questionId,
      user: { id: userId },
    });

    if (question.affected === 0) {
      throw new NotFoundException('Question not found');
    }
  }
}
