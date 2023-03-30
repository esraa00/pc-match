import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteTypeController } from './vote-type.controller';
import { VoteType } from './vote-type.entity';
import { VoteTypeService } from './vote-type.service';

@Module({
  controllers: [VoteTypeController],
  providers: [VoteTypeService],
  imports: [TypeOrmModule.forFeature([VoteType])],
})
export class VoteTypeModule {}
