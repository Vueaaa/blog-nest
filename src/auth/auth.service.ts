import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: Partial<User>) {
    console.log(user,'user');
    
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { token,user };
  }
  
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }
}
