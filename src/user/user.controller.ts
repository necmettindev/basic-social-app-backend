import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUserResultDto } from './dto/get-user-result.dto';
import { DecodedHTTP } from 'src/common/decorators/decoded.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(
    @DecodedHTTP() { userId },
    @Param() { id }: GetUserDto,
  ): GetUserResultDto | any {
    return this.userService.findOne(userId, id);
  }

  @Post('/login')
  async login(@Body() { username, password }: LoginUserDto) {
    return this.userService.login(username, password);
  }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return {
        code: 200,
        error: 0,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        code: error.errno,
        codeString: error.code,
        error: 1,
        message: "Couldn't create user",
      };
    }
  }
}
