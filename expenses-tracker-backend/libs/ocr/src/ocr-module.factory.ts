import { Provider } from '@nestjs/common';
import { OcrAsyncConfig, OcrConfig } from '@app-libs/ocr/types';
import { OCR_CONFIG } from '@app-libs/ocr/constants';
import { OcrService } from '@app-libs/ocr/services';
import { HttpModuleOptions } from '@nestjs/axios';

const sharedProviders: Provider[] = [OcrService];
export const createSharedProviders = (config: OcrConfig): Provider[] => [
  {
    provide: OCR_CONFIG,
    useValue: config,
  },
  ...sharedProviders,
];

export const createSharedProvidersAsync = (
  provider: OcrAsyncConfig,
): Provider[] => [
  {
    provide: OCR_CONFIG,
    ...provider,
  },
  ...sharedProviders,
];

export const createHttpOptions = (config: OcrConfig): HttpModuleOptions => {
  return {
    baseURL: config.apiUrl.replace(/\/$/, ''),
  };
};
