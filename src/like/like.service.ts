import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}
  async create(userId: any, { post_id }: CreateLikeDto) {
    console.log(userId, post_id);
    const isLiked = await this.likeRepository
      .createQueryBuilder('like')
      .where('like.post_id = :post_id', { post_id })
      .andWhere('like.user_id = :user_id', { user_id: userId })
      .getOne();

    if (isLiked != null) {
      return {
        code: 400,
        error: 1,
        message: 'You already liked this post',
      };
    }

    const record = this.likeRepository.create({
      post_id: post_id as any,
      user_id: userId as any,
    });
    return this.likeRepository.save(record);
  }

  remove(userId: any, postId: any) {
    return this.likeRepository
      .createQueryBuilder('like')
      .delete()
      .where('like.post_id = :post_id', { post_id: postId })
      .andWhere('like.user_id = :user_id', { user_id: userId })
      .execute();
  }
}
