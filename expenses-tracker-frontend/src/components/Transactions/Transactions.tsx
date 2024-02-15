import moment from 'moment';
import { useCurrentUser } from '../../contexts/UserContext';
import { useAsync } from '../../hooks/useAsync';
import { transactionsService } from '../../services/transactions-service';
import classes from './Transactions.module.css';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from '@mui/material';
import { TransactionResponse } from 'shared/types';
import { CurrencyEnum } from 'shared/enums/currency';
import { displayAmountWithCurrency } from '../../lib/displayAmountWithCurrency';

// TODO: Remove mockTransactions, once there is a sufficient amount of real data
const mockTransactions: Omit<TransactionResponse, 'owner'>[] = [
  {
    id: 'aaa',
    merchantName: 'Fantastico',
    merchantAddress: 'гр. София, ул. Любляна',
    date: new Date(),
    amount: '69.24',
    currency: CurrencyEnum.BGN,
  },
  {
    id: 'aba',
    merchantName: 'Sexwell',
    date: new Date(),
    amount: '879,20',
    currency: CurrencyEnum.BGN,
  },
  {
    id: 'dada',
    merchantName: 'Steam',
    date: new Date(),
    amount: '879,20',
    currency: CurrencyEnum.EUR,
  },
];

interface TransactionsProps {
  onAddTransactionClick: () => void;
}

export function Transactions({ onAddTransactionClick }: TransactionsProps) {
  const user = useCurrentUser();

  // TODO: Handle no user scenario
  if (!user) {
    throw new Error('Invalid Session');
  }

  const {
    data: transactions,
    loading: transactionLoading,
    error: transactionsError,
  } = useAsync(async () => {
    return await transactionsService.getAllByUserId(user.id);
  }, [user]);

  if (transactionLoading) {
    return <p>Loading...</p>;
  }

  if (transactionsError) {
    return <p>ERROR!</p>;
  }

  return (
    <>
      <div className={classes.tableHeader}>
        <Typography variant="h5">Recent Transactions</Typography>
        <Button variant="contained" onClick={onAddTransactionClick}>
          Add Transaction
        </Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Merchant Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            [...transactions, ...mockTransactions].map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {moment(transaction.date).format('DD MMMM, HH:mm')}
                </TableCell>
                <TableCell>{transaction.merchantName ?? 'N/A'}</TableCell>
                <TableCell>{transaction.merchantAddress ?? 'N/A'}</TableCell>
                <TableCell align="right">
                  {displayAmountWithCurrency(
                    transaction.amount,
                    transaction.currency,
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
