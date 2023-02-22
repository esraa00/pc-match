import { IsEmail, IsString } from 'class-validator';
import { TransformFnParams, Transform } from 'class-transformer';

export class LogInUserDto {
  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  @IsEmail()
  email: string;

  @Transform(
    ({ value }: TransformFnParams) => typeof value === 'string' && value.trim(),
  )
  @IsString()
  password: string;
}
