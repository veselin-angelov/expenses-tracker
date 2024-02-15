import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared/shared.module';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { TransactionModule } from '@app/transactions/transactions.module';
import { FilesModule } from '@app/files/files.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    AuthModule,
    TransactionModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
