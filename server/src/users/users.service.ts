import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupParams } from 'src/auth/typings/signup.type';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDetails: SignupParams, password: string): Promise<User> {
        const newUser = this.userRepository.create({ ...createUserDetails, password });
        return await this.userRepository.save(newUser);
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user || null;
    }
}