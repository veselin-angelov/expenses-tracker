import { HttpService } from './http-service';
import { TransactionResponse } from 'shared/types';

interface GetAllTransactionsReponse {
  count: number;
  fetched: number;
  result: TransactionResponse[];
}

class TransactionsService {
  private http = new HttpService();

  async getAllTransactions() {
    const response =
      await this.http.get<GetAllTransactionsReponse>('/transactions');

    return response.result;
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

  // TODO: call the file upload endpoint with the file
  // async addReceipt(file: File) {
  //   const response = await this.http.post('/files', {
  //     body:
  //   })
  // }
}

export const transactionsService = new TransactionsService();
