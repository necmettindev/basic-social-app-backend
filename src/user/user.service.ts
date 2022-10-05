import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follow/entities/follow.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResultDto } from './dto/get-user-result.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const record = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(record);
  }

  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { username, password },
    });
    if (user) {
      return {
        code: 200,
        error: 0,
        message: 'User logged in successfully',
        token: this.jwtService.sign({ userId: user.id }),
      };
    }
    return {
      code: 401,
      error: 1,
      message: 'Invalid username or password',
    };
  }

  findAll() {
    return this.usersRepository.find({
      select: ['id', 'username', 'bio', 'full_name', 'profile_picture'],
    });
  }

  async findOne(userId: number, id: number): Promise<GetUserResultDto | any> {
    const result = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'full_name', 'profile_picture'],
    });

    const isFollowed = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.follower_id = :user_id', { user_id: userId })
      .andWhere('follow.following_id = :following_id', { following_id: id })
      .getOne();

    if (result != null) {
      return Object.assign(result, { followed: isFollowed != null });
    }
    return {
      message: 'User not found',
    };
  }
}
