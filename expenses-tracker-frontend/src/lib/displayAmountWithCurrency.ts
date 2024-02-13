import { CurrencyEnum } from 'shared/enums';

export function displayAmountWithCurrency(
  amount: string,
  currency: CurrencyEnum,
) {
  switch (currency) {
    case CurrencyEnum.BGN:
      return `${amount} лв.`;
    case CurrencyEnum.EUR:
      return `${amount} €`;
    case CurrencyEnum.USD:
      return `$${amount}`;
    case CurrencyEnum.GBP:
      return `£${amount}`;
    default:
      return amount;
  }
}
