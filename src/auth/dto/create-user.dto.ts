import {
  IsString,
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TransformFnParams, Transform } from 'class-transformer';

export class CreateUserDTO {
  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  fullName: string;

  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  @IsEmail()
  email: string;

  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'password should contain at least one uppercase character, one lowercase character , one digit and one special character',
  })
  password: string;

  // TODO - add a custom validation to make it equal to password
  confirmPassword: string;
}
