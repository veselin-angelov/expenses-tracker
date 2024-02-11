import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshCommand } from './refresh.command';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/core';
import { JwtService } from '../services/jwt.service';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RefreshCommand) {
    const decodedToken = this.jwtService.check(command.refreshToken);
    const user = await this.userRepository.findOneOrFail({
      id: decodedToken.id,
    });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const areTokensMatching = await argon.verify(
      user.refreshToken,
      command.refreshToken,
    );
    if (!areTokensMatching) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = this.jwtService.create({
      ...decodedToken,
      id: user.id,
    });
    user.refreshToken = await argon.hash(tokens.refreshToken);
    await this.em.persistAndFlush(user);
    return tokens;
  }
}
