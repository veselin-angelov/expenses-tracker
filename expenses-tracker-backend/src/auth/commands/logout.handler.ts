import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from '@mikro-orm/postgresql';
import { LogoutCommand } from './logout.command';
import { MessageResponseDto } from '@app/shared/dtos';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private readonly em: EntityManager) {}

  async execute({ user }: LogoutCommand) {
    user.refreshToken = undefined;

    await this.em.persistAndFlush(user);

    return new MessageResponseDto('Logout successful');
  }
}
