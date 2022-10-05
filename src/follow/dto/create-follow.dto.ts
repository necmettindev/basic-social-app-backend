import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
