import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@app/shared/shared.module';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [SharedModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
