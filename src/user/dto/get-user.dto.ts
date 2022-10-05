import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { toNumber } from 'src/common/helper/cast.helper';

export class GetUserDto {
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  id: number;
}
