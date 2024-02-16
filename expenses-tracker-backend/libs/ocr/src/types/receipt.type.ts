export type Receipt = {
  total: number;
  date: Date | null;
  currency: string | null;
  merchant: {
    name: string | null;
    address: string | null;
  } | null;
};
