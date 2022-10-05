import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  full_name: string;

  @IsNotEmpty()
  @IsUrl()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  profile_picture: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  bio: string;
}
