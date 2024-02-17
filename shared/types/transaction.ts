import { CurrencyEnum } from "../enums/currency";

export interface TransactionResponse {
  id: string;
  merchantName?: string;
  merchantAddress?: string;
  date?: Date;
  amount: string;
  currency: CurrencyEnum;
  description?: string;
  owner: { id: string } | null;
  receipt: { id: string } | null;
}
