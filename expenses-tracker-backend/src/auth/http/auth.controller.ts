import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from '../commands/login.command';
import { RefreshCommand } from '../commands/refresh.command';
import { LogoutCommand } from '../commands/logout.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() body: any) {
    const { token } = body;
    return await this.commandBus.execute(new LoginCommand(token));
  }

  //TODO: Decorator for required login
  @Post('refresh')
  async refresh(@Body() body: any) {
    const { refreshToken } = body;
    return await this.commandBus.execute(new RefreshCommand(refreshToken));
  }

  @Post('logout')
  async logout(@Body('id') id: string) {
    return await this.commandBus.execute(new LogoutCommand(id));
  }
}
