import { Follow } from 'src/follow/entities/follow.entity';
import { Like } from 'src/like/entities/like.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  bio: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  created_at: number;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = (Date.now() / 1000) | 0;
  }

  @OneToMany(() => Post, (post) => post.user_id)
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.following_id)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower_id)
  followers: Follow[];

  @OneToMany(() => Like, (like) => like.user_id)
  likes: Like[];
}
