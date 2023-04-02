import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UseAccessTokenGuard } from 'src/guards';
import { GetCurrentUser } from 'src/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseAccessTokenGuard()
  @Get('/:userId')
  async getUserById(
    @Param('userId') userId: number,
    @GetCurrentUser('userId') currentUserId: number,
  ) {
    if (userId != currentUserId)
      throw new UnauthorizedException(
        'you are not authorized to perform this action',
      );
    return await this.userService.findOneByIdWithJoin(userId);
  }
}
