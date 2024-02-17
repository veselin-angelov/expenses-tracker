import { Abstract, ModuleMetadata, Type } from '@nestjs/common';

export type OcrConfig = {
  apiKey: string;
  apiUrl: string;
};

export type OcrAsyncConfig = Pick<ModuleMetadata, 'imports'> & {
  useFactory: (...args: any[]) => Promise<OcrConfig> | OcrConfig;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
