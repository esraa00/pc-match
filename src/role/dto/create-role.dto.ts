import { IsAlpha } from 'class-validator';

export class CreateRoleDTO {
  @IsAlpha()
  roleName: string;
}
