import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
} from '@app/auth/commands';
import { User } from '@app/users/entities';
import { MessageResponseDto } from '@app/shared/dtos';
import {
  ApiLogin,
  ApiLogout,
  ApiRefreshToken,
  InjectUser,
} from '@app/auth/decorators';
import { EmailPasswordLoginCommand } from '../commands/email-password-login.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiLogin()
  @Post('login')
  async login(@Body('token') token: string) {
    return await this.commandBus.execute(new LoginCommand(token));
  }

  @ApiRefreshToken()
  @Post('refresh')
  async refresh(@InjectUser() user: User) {
    return await this.commandBus.execute(new RefreshCommand(user));
  }

  @ApiLogout()
  @Post('logout')
  async logout(@InjectUser() user: User): Promise<MessageResponseDto> {
    return await this.commandBus.execute(new LogoutCommand(user));
  }

  @ApiLogin()
  @Post('email-password-login')
  async emailPasswordLogin(@Body() body: { email: string; password: string }) {
    return await this.commandBus.execute(
      new EmailPasswordLoginCommand(body.email, body.password),
    );
  }
}
