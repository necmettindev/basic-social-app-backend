import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    nullable: false,
  })
  @JoinColumn({ name: 'post_id' })
  post_id: Post;

  @ManyToOne(() => User, (user) => user.likes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column({
    type: 'int',
    nullable: true,
  })
  created_at: number;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = (Date.now() / 1000) | 0;
  }
}
