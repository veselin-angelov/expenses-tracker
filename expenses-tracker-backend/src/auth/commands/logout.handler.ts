import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/postgresql';
import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async execute(command: LogoutCommand) {
    const user = await this.userRepository.findOneOrFail({ id: command.id });

    user.refreshToken = undefined;

    this.em.persistAndFlush(user);

    return { message: 'Logout successful' };
  }
}
