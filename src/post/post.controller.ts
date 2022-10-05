import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DecodedHTTP } from 'src/common/decorators/decoded.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@DecodedHTTP() { userId }, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto);
  }

  @Get()
  findAll(@DecodedHTTP() { userId }) {
    return this.postService.findAll(userId);
  }

  @Get(':id')
  find(@DecodedHTTP() { userId }, @Param('id') id: string) {
    return this.postService.find(userId, +id);
  }

  @Get('user/:id')
  findUserPosts(@Param('id') id: string) {
    return this.postService.findUserPosts(+id);
  }

  @Get('get_posts/:userId/:postIds')
  getPosts(
    @DecodedHTTP() { userId },
    @Param('userId') profileId: number,
    @Query('postIds') postIds: number[],
  ) {
    try {
      return this.postService.getPosts(userId, profileId, postIds);
    } catch (error) {
      return {
        code: 404,
        codeString: 'Not Found',
        error: 1,
      };
    }
  }
}
