import { HttpService } from './http-service';
import { TransactionResponse } from 'shared/types';

interface GetAllTransactionsReponse {
  count: number;
  fetched: number;
  result: TransactionResponse[];
}

class TransactionsService {
  private http = new HttpService();

  async getAllByUserId(userId: string) {
    const response = await this.http.get<GetAllTransactionsReponse>(
      `/users/${userId}/transactions`,
    );

    return response.result;
  }
}

export const transactionsService = new TransactionsService();
