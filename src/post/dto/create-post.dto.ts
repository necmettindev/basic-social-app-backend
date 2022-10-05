import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  description: string;

  @IsUrl()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  image: string;
}
