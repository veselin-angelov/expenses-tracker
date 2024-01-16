import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '../services/jwt.service';
import { LoginCommand } from '../commands/login.command';
import { User } from '@app/users/entities';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/postgresql';
import { GoogleLoginService } from '../services/google-auth.service';
import * as argon from 'argon2';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly googleLoginService: GoogleLoginService,
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const { email, picture, name } = await this.googleLoginService.decodeToken(
      command.token,
    );

    let user = await this.userRepository.findOne({ email });

    if (!user) {
      user = new User(email);
    }

    const tokens = this.jwtService.create({
      id: user.id,
      email,
      picture,
      name,
    });

    user.refreshToken = await argon.hash(tokens.refreshToken);
    await this.em.persistAndFlush(user);

    return tokens;
  }
}
