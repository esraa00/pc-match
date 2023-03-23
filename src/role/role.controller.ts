import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { GetRoleByNameDTO } from './dto/get-role-by-name.dto';
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

  @Get('/:roleName')
  async getRoleByName(@Param() getRoleByNameDTO: GetRoleByNameDTO) {
    const role = await this.roleService.findOneByName(
      getRoleByNameDTO.roleName,
    );
    if (!role) throw new NotFoundException('role was not found');
    return await this.roleService.findOneByName(getRoleByNameDTO.roleName);
  }
}
