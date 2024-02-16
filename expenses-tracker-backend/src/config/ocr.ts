import { OcrConfig } from '@app-libs/ocr';

export const OCR_CONFIG_KEY = 'ocr';

export const ocr = (): {
  [OCR_CONFIG_KEY]: OcrConfig;
} => ({
  [OCR_CONFIG_KEY]: {
    apiUrl: process.env.OCR_API_URL!,
    apiKey: process.env.OCR_API_KEY!,
  },
});
