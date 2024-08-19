import { User } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    console.log(username, 'username');

    // 只有当 username 存在时才执行查询
    if (!username) {
      throw new HttpException('用户名未提供', HttpStatus.BAD_REQUEST);
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    console.log(existUser, 'existUser');

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }
}
