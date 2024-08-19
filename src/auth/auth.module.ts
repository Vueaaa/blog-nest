import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// const jwtModule = JwtModule.register({
//     secret:"xxx"
// })
// 这里不建议将秘钥写死在代码也， 它应该和数据库配置的数据一样，从环境变量中来
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'test123456'),
      signOptions: { expiresIn: '4h' },
    };
  },
});
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule,jwtModule,
],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage],
  exports: [jwtModule],
})

export class AuthModule {}
