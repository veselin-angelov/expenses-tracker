import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@app/auth/services';
import { User } from '@app/users/entities';
import { UserRepository } from '@app/users/repositories';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { EmailPasswordLoginCommand } from './email-password-login.command';
import { AuthType } from '@app/shared/enums/auth-type.enum';

@CommandHandler(EmailPasswordLoginCommand)
export class EmailPasswordLoginHandler
  implements ICommandHandler<EmailPasswordLoginCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: EmailPasswordLoginCommand) {
    const { email, password } = command;

    let user = await this.userRepository.findOne({ email });

    if (!user) {
      user = new User(email, AuthType.EMAIL);
      user.password = await bcrypt.hash(password, 10);
    } else {
      if (user.authType !== AuthType.EMAIL) {
        throw new UnauthorizedException('Please login with Google');
      }
      const isValid = await bcrypt.compare(password, user.password!);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    const tokens = this.jwtService.create({
      id: user.id,
      email,
      name: email.split('@')[0],
      picture: `https://ui-avatars.com/api/?name=${email}`,
    });

    user.refreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.em.persistAndFlush(user);

    return tokens;
  }
}
