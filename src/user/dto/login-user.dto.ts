import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Transform(({ value }) => value?.trim())
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Transform(({ value }) => value?.trim())
  password: string;
}
