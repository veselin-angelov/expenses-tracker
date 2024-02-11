import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from '../commands/login.command';
import { RefreshCommand } from '../commands/refresh.command';
import { LogoutCommand } from '../commands/logout.command';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body('token') token: string) {
    return await this.commandBus.execute(new LoginCommand(token));
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user;
    return await this.commandBus.execute(new RefreshCommand(user.refreshToken));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    return await this.commandBus.execute(new LogoutCommand(user.id));
  }
}
