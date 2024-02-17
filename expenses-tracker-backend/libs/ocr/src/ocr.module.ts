import { DynamicModule, Module } from '@nestjs/common';
import { OcrService } from '@app-libs/ocr/services';
import { OcrAsyncConfig, OcrConfig } from '@app-libs/ocr/types';
import {
  createHttpOptions,
  createSharedProviders,
  createSharedProvidersAsync,
} from '@app-libs/ocr/ocr-module.factory';
import { HttpModule } from '@nestjs/axios';
import { OCR_CONFIG } from '@app-libs/ocr/constants';

@Module({
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {
  static forRoot(config: OcrConfig): DynamicModule {
    const sharedProviders = createSharedProviders(config);

    return {
      imports: [HttpModule.register(createHttpOptions(config))],
      module: OcrModule,
      providers: sharedProviders,
      exports: sharedProviders,
    };
  }
  static forRootAsync(provider: OcrAsyncConfig): DynamicModule {
    const sharedProviders = createSharedProvidersAsync(provider);

    return {
      imports: [
        HttpModule.registerAsync({
          extraProviders: [
            {
              provide: OCR_CONFIG,
              ...provider,
            },
          ],
          imports: provider.imports,
          inject: [OCR_CONFIG],
          useFactory: (config) => createHttpOptions(config),
        }),
      ],
      module: OcrModule,
      providers: sharedProviders,
      exports: sharedProviders,
    };
  }
}
