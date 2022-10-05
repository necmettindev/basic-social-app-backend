import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { toBoolean, toNumber } from 'src/common/helper/cast.helper';

export class GetUserResultDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  id: number;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  username: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  full_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  profile_picture: string;

  @IsNotEmpty()
  @Transform(({ value }) => toBoolean(value))
  followed: boolean;
}
