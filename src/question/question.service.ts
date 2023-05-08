import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Question } from './question.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async create(
    userId: number,
    productId: number,
    question: string,
  ): Promise<Question> {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productService.findOneById(productId);
    if (!product) throw new NotFoundException('product not found');

    const questionCreated = this.questionRepo.create({
      user,
      product,
      question,
    });

    return await this.questionRepo.save(questionCreated);
  }

  async delete(userId: number, questionId: number): Promise<void> {
    const questionFound = await this.questionRepo.findOneBy({ id: questionId });
    if (!questionFound) {
      throw new NotFoundException('question was not found');
    }

    if (userId != questionFound.user.id) {
      throw new UnauthorizedException(
        "you can't delete a question that you didn't make",
      );
    }

    const questionDeleted = await this.questionRepo.delete({
      id: questionId,
      user: { id: userId },
    });

    if (questionDeleted.affected === 0) {
      throw new NotFoundException('Question didn`t deleted, please try again');
    }
  }

  async find() {
    return await this.questionRepo.find();
  }

  async findOneById(id: number) {
    return await this.questionRepo.findOneBy({ id });
  }

  async update(userId: number, questionId: number, question?: string) {
    const questionFound = await this.findOneById(questionId);
    if (!questionFound) {
      throw new NotFoundException('no question found');
    }
    if (userId != questionFound.user.id) {
      throw new UnauthorizedException("don't play with other's questions");
    }
    Object.assign(questionFound, { question });
    return await this.questionRepo.save(questionFound);
  }
}
