import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  async create(roleName: string) {
    const role = this.repo.create({ roleName });
    return await this.repo.save(role);
  }

  async findOneByName(roleName: string) {
    return await this.repo.findOneBy({ roleName });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }
}
