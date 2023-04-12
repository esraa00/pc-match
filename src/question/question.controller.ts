import { Controller } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}
}
