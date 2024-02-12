import { forwardRef, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from '@app/auth/http';
import { GoogleLoginService, JwtService } from '@app/auth/services';
import { UsersModule } from '@app/users/users.module';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from '@app/auth/strategies';
import {
  LoginHandler,
  LogoutHandler,
  RefreshHandler,
} from '@app/auth/commands';

const controllers = [AuthController];

const commandHandlers = [LoginHandler, LogoutHandler, RefreshHandler];

const services = [GoogleLoginService, JwtService];

const sharedProviders: Provider[] = [
  ...commandHandlers,
  ...services,
  {
    inject: [ConfigService],
    provide: OAuth2Client,
    useFactory: (configService: ConfigService) =>
      new OAuth2Client(configService.get<string>('GOOGLE_API_CLIENT_ID')),
  },
  AccessTokenStrategy,
  RefreshTokenStrategy,
];

@Module({
  imports: [CqrsModule, forwardRef(() => UsersModule)],
  controllers: controllers,
  providers: sharedProviders,
  exports: sharedProviders,
})
export class AuthModule {}
