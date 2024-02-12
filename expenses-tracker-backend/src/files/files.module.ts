import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SaveFileHandler } from '@app/files/commands';
import { FileHandler } from '@app/files/queries';
import { FileExistsConstraint } from '@app/files/constraints';
import { FileValidationService } from '@app/files/services';
import { FilesController } from '@app/files/http';
import { AuthModule } from '@app/auth/auth.module';
import { FILE_VALIDATORS } from '@app/files/constants';
import { FileValidator } from '@app/files/types';
import { isValidMimeType, isValidSize } from '@app/files/helpers';
import { FileResponseTransformerFactory } from '@app/files/factories';
import { SignUrlTransformer } from '@app/files/transformers';
import { SignedUrlService } from '@lab08/nestjs-s3';
import { File } from '@app/files/entities';

const commandHandlers = [SaveFileHandler];

const queryHandlers = [FileHandler];

const constraints = [FileExistsConstraint];

const services = [
  FileValidationService,
  {
    provide: FILE_VALIDATORS,
    useFactory: () => {
      return (): FileValidator[] | null => {
        return [
          isValidSize(1e6),
          isValidMimeType(
            ['image/jpeg', 'image/png'],
            'File must be of type .jpg/.jpeg or .png',
          ),
        ];
      };
    },
  },
  {
    provide: FileResponseTransformerFactory,
    inject: [SignedUrlService],
    useFactory: (signedUrlService: SignedUrlService) => {
      return new FileResponseTransformerFactory([
        new SignUrlTransformer(signedUrlService),
      ]);
    },
  },
];

const sharedProviders: Provider[] = [
  ...commandHandlers,
  ...queryHandlers,
  ...constraints,
  ...services,
];

@Module({
  controllers: [FilesController],
  imports: [
    forwardRef(() => AuthModule),
    MikroOrmModule.forFeature({
      entities: [File],
    }),
    CqrsModule,
    ConfigModule,
  ],
  providers: [...sharedProviders],
  exports: [...sharedProviders, MikroOrmModule],
})
export class FilesModule {}
