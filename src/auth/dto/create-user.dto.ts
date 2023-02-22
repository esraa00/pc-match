import {
  IsString,
  IsEmail,
  IsMobilePhone,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { TransformFnParams, Transform } from 'class-transformer';

export class CreateUserDTO {
  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  @IsString({ message: 'only characters are allowed' })
  @NotContains(' ', { message: "firstName shouldn't contain spaces" })
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString({ message: 'only characters are allowed' })
  @NotContains(' ', { message: "firstName shouldn't contain spaces" })
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;

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
