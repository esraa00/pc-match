import { IsAlpha } from 'class-validator';

export class DeleteRoleByNameDTO {
  @IsAlpha()
  roleName: string;
}
