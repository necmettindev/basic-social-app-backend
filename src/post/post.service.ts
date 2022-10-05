import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follow/entities/follow.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}
  create(userId: number, createPostDto: CreatePostDto) {
    const record = this.postRepository.create({
      ...createPostDto,
      user_id: userId as any,
    });
    return this.postRepository.save(record);
  }

  findAll(userId: any) {
    return this.postRepository
      .createQueryBuilder('post')
      .where({
        user_id: userId,
      })
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  async find(userId: any, postId: any) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user_id', 'user')
      .select([
        'post',
        'user.username',
        'user.id',
        'user.full_name',
        'user.profile_picture',
      ])
      .where('post.id = :id', { id: postId })
      .getOne();

    if (post == null) {
      return {
        code: 404,
        error: 1,
        message: 'Post not found',
      };
    }

    const isLiked = await this.likeRepository
      .createQueryBuilder('like')
      .where('like.post_id = :post_id', { post_id: postId })
      .andWhere('like.user_id = :user_id', { user_id: userId })
      .getOne();

    return Object.assign(post, { liked: isLiked != null });
  }

  findUserPosts(userId: any) {
    return this.postRepository
      .createQueryBuilder('post')
      .where({
        user_id: userId,
      })
      .orderBy('post.created_at', 'DESC')
      .getMany();
  }

  async getPosts(userId: number, profileId: number, postIds: number[]) {
    const user = await this.userRepository.findOne({
      where: { id: profileId },
      select: ['id', 'username', 'full_name', 'profile_picture'],
    });

    const isFollowed = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.follower_id = :user_id', { user_id: userId })
      .andWhere('follow.following_id = :following_id', {
        following_id: profileId,
      })
      .getOne();

    const owner = Object.assign(user, { followed: isFollowed != null });

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where('post.user_id = :user_id', { user_id: profileId })
      .andWhereInIds(postIds)
      .getMany();
    const likes = await this.likeRepository.query(
      "SELECT * FROM `like` WHERE `post_id` IN ('" + postIds.join("','") + "')",
    );

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const like = likes.find((like: any) => like.post_id == post.id);
      posts[i] = Object.assign(post, { liked: like != null });
      posts[i] = Object.assign(post, { owner });
    }

    return posts;
  }

  mergePosts(listOfPosts: [Post[]]): Post[] {
    const merged = listOfPosts.reduce((acc, val) => acc.concat(val), []);
    return merged;
  }
}
