import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(fullName: string, email: string, password: string, role: Role) {
    const user = this.repo.create({
      fullName,
      email,
      password,
      roles: [role],
    });
    return await this.repo.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findOneByIdWithJoin(id: number) {
    return await this.repo.findOne({ relations: ['favorites'], where: { id } });
  }

  async update(id: number, data: Partial<User>) {
    const userFound = await this.findOneById(id);
    if (!userFound) throw new NotFoundException('user not found');
    Object.assign(userFound, data);
    return await this.repo.save(userFound);
  }

  async markEmailAsConfirmed(email: string) {
    const userFound = await this.findOneByEmail(email);
    if (!userFound) throw new NotFoundException('user not found');
    userFound.isEmailConfirmed = true;
    return await this.repo.save(userFound);
  }

  async saveUser(user: User) {
    await this.repo.save(user);
  }
}
