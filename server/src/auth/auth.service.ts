import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupParams } from './typings/signup.type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/users/entities/user.entity';
import { LoginParams } from './typings/login.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signup(signupDetails: SignupParams): Promise<User> {
        const existingUser: User | null = await this.usersService.findUserByUsername(signupDetails.username);

        if (existingUser) {
            throw new Error("User with this username already exists");
        }

        const salt: string = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(signupDetails.password, salt);

        const newUser: User = await this.usersService.createUser(signupDetails, hashedPassword);
        return newUser
    }

    async login(loginDetails: LoginParams): Promise<{ accessToken: string }> {
        const user: User | null = await this.usersService.findUserByUsername(loginDetails.username);

        if (!user || !(await bcrypt.compare(loginDetails.password, user.password))) {
            throw new UnauthorizedException("User with this username not found or invalid password");
        }

        const payload: object = { sub: user.id, username: user.username };
        const accessToken: string = await this.jwtService.signAsync(payload);
        return { accessToken };
    }
}