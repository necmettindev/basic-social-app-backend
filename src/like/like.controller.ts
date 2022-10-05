import { Controller, Post, Body, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { DecodedHTTP } from 'src/common/decorators/decoded.decorator';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@DecodedHTTP() { userId }, @Body() { post_id }: CreateLikeDto) {
    return this.likeService.create(userId, { post_id });
  }

  @Delete()
  remove(@DecodedHTTP() { userId }, @Body() { post_id }: CreateLikeDto) {
    return this.likeService.remove(userId, post_id);
  }
}
