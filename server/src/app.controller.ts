import { Controller, Get, NotFoundException, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { Request } from 'express';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  async home(@Req() req: Request) {
    if (!req.user || !req.user.username) {
      throw new NotFoundException('User not found in request');
    }

    const user = await this.usersService.findUserByUsername(req.user?.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user: user };
  }
}