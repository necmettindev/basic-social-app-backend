import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create({ follower_id, following_id }) {
    if (follower_id == following_id) {
      return {
        message: 'You cannot follow yourself',
      };
    }

    const data = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.follower_id = :follower_id', { follower_id })
      .andWhere('follow.following_id = :following_id', { following_id })
      .getOne();

    if (data !== null) {
      return {
        message: 'You are already following this user',
      };
    }

    const record = this.followRepository.create({
      follower_id,
      following_id,
    });
    return this.followRepository.save(record);
  }

  findFollowers(id: number) {
    return this.followRepository
      .createQueryBuilder('follow')
      .leftJoin('follow.follower_id', 'user')
      .addSelect(['user.id', 'user.username', 'user.profile_picture'])
      .where('follow.following_id = :id', { id })
      .getMany();
  }

  findFollowing(id: number) {
    return this.followRepository
      .createQueryBuilder('follow')
      .leftJoin('follow.following_id', 'user')
      .addSelect(['user.id', 'user.username', 'user.profile_picture'])
      .where('follow.follower_id = :id', { id })
      .getMany();
  }

  async remove(userId: number, id: number) {
    try {
      const record = await this.followRepository
        .createQueryBuilder('follow')
        .delete()
        .where('follow.follower_id = :follower_id', { follower_id: userId })
        .andWhere('follow.following_id = :following_id', { following_id: id })
        .execute();

      if (record.affected !== 0) {
        return {
          code: 200,
          error: 0,
          message: 'Unfollowed successfully',
        };
      }

      return {
        error: 0,
        message: 'You are not following this user',
      };
    } catch (error) {
      return {
        code: 200,
        error: 1,
        message: 'Something went wrong',
      };
    }
  }
}
