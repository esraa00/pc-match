import { Controller, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) { }
  
  @UseAccessTokenGuard()
  @Post('/')
  createQuestion(@GetCurrentUser('userId') userId: number) { }
}
