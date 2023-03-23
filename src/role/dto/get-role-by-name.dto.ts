import { IsAlpha } from 'class-validator';

export class GetRoleByNameDTO {
  @IsAlpha()
  roleName: string;
}
