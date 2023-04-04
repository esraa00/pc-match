import { Controller, Post, Body, Get } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDTO } from './dto/create-rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post('/')
  async create(@Body() createRateDTO: CreateRateDTO) {
    return await this.rateService.create(createRateDTO);
  }

  @Get('/')
  async get() {
    return await this.rateService.get();
  }
}
