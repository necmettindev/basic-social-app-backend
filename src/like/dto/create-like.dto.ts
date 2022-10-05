import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @IsNotEmpty()
  post_id: number;
}
