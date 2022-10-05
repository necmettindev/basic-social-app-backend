import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import { Follow } from 'src/follow/entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like, User, Follow])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
