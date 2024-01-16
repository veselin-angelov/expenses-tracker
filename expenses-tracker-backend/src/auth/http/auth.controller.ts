import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from '../commands/login.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() body: any) {
    const { token } = body;
    const result = await this.commandBus.execute(new LoginCommand(token));
    return result;
  }
}
