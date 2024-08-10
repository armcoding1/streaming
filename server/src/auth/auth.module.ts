import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtVariables } from './variables/jwt.variables';
import SpotifyWebApi from "spotify-web-api-node";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: jwtVariables.JWT_SECRET,
    signOptions: {expiresIn: jwtVariables.JWT_EXPIRES}
  })],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
