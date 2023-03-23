import { Controller, Get, Query } from '@nestjs/common';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { ConfirmEmailDTO } from './dto/confirmEmail.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}
  @Get('confirm')
  async confirm(@Query() confirmEmailDTO: ConfirmEmailDTO) {
    await this.emailConfirmationService.confirm(confirmEmailDTO);
  }

  @Get('resend-confirmation-link')
  @UseAccessTokenGuard()
  async resendConfirmationLink(@GetCurrentUser('userId') id: number) {
    await this.emailConfirmationService.resendConfirmationLink(id);
  }
}
