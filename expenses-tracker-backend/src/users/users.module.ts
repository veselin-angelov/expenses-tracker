import { Module, Provider } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@app/users/entities';
import { UsersController } from '@app/users/http';
import { UserHandler } from '@app/users/queries';
import { CqrsModule } from '@nestjs/cqrs';

const controllers = [UsersController];

const queryHandlers = [UserHandler];

const sharedProviders: Provider[] = [...queryHandlers];

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  controllers: controllers,
  providers: sharedProviders,
  exports: [...sharedProviders, MikroOrmModule],
})
export class UsersModule {}
