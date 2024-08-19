import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // user.controller.ts
 @ApiOperation({ summary: '注册用户' })
 @ApiResponse({ status: 201, type: [User] })
 @Post('register')
 register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }
}
