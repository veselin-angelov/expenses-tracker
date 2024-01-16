import { Module, Provider } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/users/entities';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './http';
import { LoginHandler } from './commands/login.handler';
import { GoogleLoginService } from './services/google-auth.service';
import { JwtService } from './services/jwt.service';
import { UserRepository } from '@app/users/repositories';
import { LogoutHandler } from './commands/logout.handler';
import { RefreshHandler } from './commands/refresh.handler';

const controllers = [AuthController];

const commandHandlers = [LoginHandler, LogoutHandler, RefreshHandler];

const sharedProviders: Provider[] = [
  ...commandHandlers,
  GoogleLoginService,
  JwtService,
];

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature({
      entities: [User],
    }),
    UserRepository,
  ],
  controllers: controllers,
  providers: sharedProviders,
  exports: sharedProviders,
})
export class AuthModule {}
