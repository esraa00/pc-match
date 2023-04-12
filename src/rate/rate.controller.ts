import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDTO } from './dto/create-rate.dto';
import { GetCurrentUser } from 'src/decorators';
import { UseAccessTokenGuard } from 'src/guards';
import { updateRateDTO } from './dto/update-rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @UseAccessTokenGuard()
  @Post('/')
  async createRate(
    @GetCurrentUser('userId') userId: number,
    @Body() createRateDTO: CreateRateDTO,
  ) {
    return await this.rateService.create(userId, createRateDTO);
  }

  @UseAccessTokenGuard()
  @Delete('/:rateId')
  async delete(
    @GetCurrentUser('userId') userId: number,
    @Param('rateId') rateId: number,
  ) {
    return await this.rateService.deleteById(userId, rateId);
  }

  @Get('/')
  async findAll() {
    return await this.rateService.find();
  }

  @Get('/:rateId')
  async findOneById(@Param('rateId') rateId: number) {
    return await this.rateService.findOneById(rateId);
  }

  @UseAccessTokenGuard()
  @Patch('/:rateId')
  async update(
    @GetCurrentUser('userId') userId: number,
    @Param('rateId') rateId: number,
    @Body() updateRateDTO: updateRateDTO,
  ) {
    return await this.rateService.update(
      rateId,
      userId,
      updateRateDTO.rate,
      updateRateDTO.comment,
    );
  }
}
