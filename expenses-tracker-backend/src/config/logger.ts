export const LOGGER_CONFIG_KEY = 'logger';
export type LoggerConfig = {
  dirname: string;
  maxSize: string;
  maxFiles: number;
  silent: boolean;
};

export const logger = (): { [LOGGER_CONFIG_KEY]: LoggerConfig } => ({
  [LOGGER_CONFIG_KEY]: {
    maxSize: process.env.LOGGER_FILE_MAX_SIZE as string,
    maxFiles: Number(process.env.LOGGER_MAX_FILES),
    dirname: process.env.LOGGER_OUTPUT_DIRECTORY as string,
    silent: process.env?.LOGGER_SILENT === 'true',
  },
});
