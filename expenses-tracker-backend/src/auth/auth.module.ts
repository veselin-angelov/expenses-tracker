import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './http';
import { LoginHandler } from './commands/login.handler';
import { GoogleLoginService } from './services/google-auth.service';
import { JwtService } from './services/jwt.service';
import { LogoutHandler } from './commands/logout.handler';
import { RefreshHandler } from './commands/refresh.handler';
import { UsersModule } from '@app/users/users.module';
import { AuthTokenStrategy } from './strategies/auth-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

const controllers = [AuthController];

const commandHandlers = [LoginHandler, LogoutHandler, RefreshHandler];

const sharedProviders: Provider[] = [
  ...commandHandlers,
  GoogleLoginService,
  JwtService,
  AuthTokenStrategy,
  RefreshTokenStrategy,
];

@Module({
  imports: [CqrsModule, UsersModule],
  controllers: controllers,
  providers: sharedProviders,
  exports: sharedProviders,
})
export class AuthModule {}
