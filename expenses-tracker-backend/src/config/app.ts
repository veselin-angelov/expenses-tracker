export const APP_CONFIG_KEY = 'app';
export type AppConfig = {
  name: string;
  environment: string;
  storagePath: string;
  encryptionKey: string;
};

export const app = (): {
  [APP_CONFIG_KEY]: Partial<AppConfig>;
} => ({
  [APP_CONFIG_KEY]: {
    name: process.env.APP_NAME,
    environment: process.env.ENVIRONMENT,
    storagePath: process.env.LOCAL_STORAGE_DIR,
    encryptionKey: process.env.ENCRYPTION_KEY,
  },
});
