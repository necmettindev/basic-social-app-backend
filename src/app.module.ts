import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Follow } from './follow/entities/follow.entity';
import { FollowModule } from './follow/follow.module';
import { Like } from './like/entities/like.entity';
import { LikeModule } from './like/like.module';
import { Post } from './post/entities/post.entity';
import { PostModule } from './post/post.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import env from './common/config/env';
import { JwtGuard } from './common/guard/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    FollowModule,
    LikeModule,
    PostModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'social',
      entities: [User, Like, Post, Follow],
      synchronize: true,
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '365d' },
        }),
        inject: [ConfigService],
      }),
      global: true,
    },
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
