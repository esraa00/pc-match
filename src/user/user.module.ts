import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CartModule } from 'src/cart/cart.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //creates the repo for us
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
