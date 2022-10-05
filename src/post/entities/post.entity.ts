import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToMany(() => Like, (like) => like.post_id)
  likes: Like[];

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
