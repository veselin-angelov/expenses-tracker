import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/core';
import { RefreshCommand } from '@app/auth/commands/refresh.command';
import { JwtService } from '@app/auth/services';
import * as bcrypt from 'bcrypt';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ user }: RefreshCommand) {
    const decodedToken = this.jwtService.check(user.refreshToken!);

    const tokens = this.jwtService.create({
      ...decodedToken,
      id: user.id,
    });

    user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.em.persistAndFlush(user);

    return tokens;
  }
}
