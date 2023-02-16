import { IsString } from 'class-validator';
import {
  IsEmail,
  IsMobilePhone,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator/types/decorator/decorators';
export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
  password: string;

  @IsString()
  @Matches('password')
  @MinLength(5)
  @MaxLength(30)
  confirmPassword: string;
}
