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
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'follower_id' })
  follower_id: User;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'following_id' })
  following_id: User;

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
