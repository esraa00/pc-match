import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { DeleteRoleByNameDTO } from './dto/delete-route-by-name.dto';
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

  @Get()
  async getAllRoles() {
    const roles = await this.roleService.find();
    return roles;
  }

  @Delete('/:roleName')
  async deleteRoleByName(@Param() deleteRoleByNameDTO: DeleteRoleByNameDTO) {
    const role = await this.roleService.findOneByName(
      deleteRoleByNameDTO.roleName,
    );
    if (!role) throw new NotFoundException('no role found to delete');
    return await this.roleService.delete(deleteRoleByNameDTO.roleName);
  }
}
