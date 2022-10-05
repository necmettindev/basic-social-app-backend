import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

import { DecodedHTTP } from 'src/common/decorators/decoded.decorator';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  create(@DecodedHTTP() { userId }, @Body() { id }: CreateFollowDto) {
    try {
      return this.followService.create({
        follower_id: userId,
        following_id: id,
      });
    } catch (error) {
      return {
        code: error.errno,
        codeString: error.code,
        error: 1,
        message: "Couldn't follow user",
      };
    }
  }

  @Delete()
  remove(@DecodedHTTP() { userId }, @Body() { id }: CreateFollowDto) {
    try {
      return this.followService.remove(userId, +id);
    } catch (error) {
      return {
        code: error.errno,
        codeString: error.code,
        error: 1,
        message: "Couldn't unfollow user",
      };
    }
  }

  @Get('/followers/:id?')
  findFollowers(@DecodedHTTP() { userId }, @Param('id') id: string) {
    return this.followService.findFollowers(id ? +id : userId);
  }

  @Get('/following/:id?')
  findFollowing(@DecodedHTTP() { userId }, @Param('id') id: string) {
    return this.followService.findFollowing(id ? +id : userId);
  }
}
