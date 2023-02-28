import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) {
    const user = this.repo.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    return await this.repo.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<User>) {
    const userFound = await this.repo.findOneBy({ id });
    if (!userFound) throw new NotFoundException('user not found');
    Object.assign(userFound, data);
    return await this.repo.save(userFound);
  }
}
