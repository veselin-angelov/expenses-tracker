import { HttpService } from './http-service';
import { TransactionResponse } from 'shared/types';

interface GetAllTransactionsReponse {
  count: number;
  fetched: number;
  result: TransactionResponse[];
}

class TransactionsService {
  private http = new HttpService();

  async getAllTransactions({
    limit = 15,
    offset,
  }: {
    limit?: number;
    offset: number;
  }) {
    const response = await this.http.get<GetAllTransactionsReponse>(
      '/transactions',
      { query: { limit: limit.toString(), offset: offset.toString() } },
    );

    return {
      transactions: response.result,
      pageCount: Math.ceil(response.count / limit),
    };
  }

  async getTransactionById(transactionId: string) {
    return await this.http.get<TransactionResponse>(
      `/transactions/${transactionId}`,
    );
  }

  async editTransactionById(
    transactionId: string,
    transaction: TransactionResponse,
  ) {
    return await this.http.patch<TransactionResponse>(
      `/transactions/${transactionId}`,
      {
        body: transaction,
      },
    );
  }

  async createTransaction(transaction: TransactionResponse) {
    const response = await this.http.post('/transactions', {
      body: transaction,
    });

    return response;
  }

  async createTransactionFromFile(transaction: { receipt: string }) {
    return await this.http.post<TransactionResponse>('/transactions/image', {
      body: transaction,
    });
  }

  // TODO: call the file upload endpoint with the file
  // async addReceipt(file: File) {
  //   const response = await this.http.post('/files', {
  //     body:
  //   })
  // }
}

export const transactionsService = new TransactionsService();
