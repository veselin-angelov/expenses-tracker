import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleLoginService, JwtService } from '@app/auth/services';
import { User } from '@app/users/entities';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import { LoginCommand } from '@app/auth/commands/login.command';

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

    user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.em.persistAndFlush(user);

    return tokens;
  }
}
