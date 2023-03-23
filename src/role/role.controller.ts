import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDTO: CreateRoleDTO) {
    const isRoleFound = await this.roleService.findOneByName(
      createRoleDTO.roleName,
    );
    if (isRoleFound) throw new ConflictException('role already exist');
    return await this.roleService.create(createRoleDTO.roleName);
  }
}
