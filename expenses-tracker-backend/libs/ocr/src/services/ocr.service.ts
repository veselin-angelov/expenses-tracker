import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import type { Readable } from 'stream';
import { OcrConfig, Receipt, ReceiptOcrResponse } from '@app-libs/ocr/types';
import { OCR_CONFIG } from '@app-libs/ocr/constants';

@Injectable()
export class OcrService {
  constructor(
    @Inject(OCR_CONFIG) private readonly config: OcrConfig,
    private readonly httpService: HttpService,
  ) {}

  public async processReceiptImage({
    dataStream,
    fileName,
    fileMimeType,
  }: {
    dataStream: Readable;
    fileName: string;
    fileMimeType: string;
  }): Promise<Receipt> {
    const formData = new FormData();
    formData.append('recognizer', 'DE');
    formData.append('api_key', this.config.apiKey);
    formData.append('file', dataStream, {
      filename: fileName,
      contentType: fileMimeType,
    });

    const { data } = await lastValueFrom(
      this.httpService.post<ReceiptOcrResponse>('/receipt', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      }),
    );

    const receipt = data.receipts[0];

    let receiptDate = receipt.date ? new Date(receipt.date) : null;

    if (receiptDate && receipt.time) {
      receiptDate = new Date(`${receipt.date} ${receipt.time}`);
    }

    return {
      total: receipt.total,
      currency: receipt.currency,
      date: receiptDate,
      merchant: {
        name: receipt.merchant_name,
        address: receipt.merchant_address,
      },
    };
  }
}
