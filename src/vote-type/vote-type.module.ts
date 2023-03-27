import { Module } from '@nestjs/common';
import { VoteTypeController } from './vote-type.controller';
import { VoteTypeService } from './vote-type.service';

@Module({
  controllers: [VoteTypeController],
  providers: [VoteTypeService]
})
export class VoteTypeModule {}
