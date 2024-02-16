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
  Box,
} from '@mui/material';
import { TransactionResponse } from 'shared/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { TransactionForm } from '../../forms/TransactionForm';
import { DividerWithText } from '../DividerWithText';
import { displayAmountWithCurrency } from '../../lib/displayAmountWithCurrency';
import { FileUpload } from '../FileUpload';

export function Transactions() {
  const user = useCurrentUser();

  const [displayTransactionForm, setDisplayTransactionForm] = useState(false);

  const { trigger: createTransaction } = useAsyncAction(async (data) => {
    await transactionsService.createTransaction(data);
    setDisplayTransactionForm(false);
    reload();
  });

  // TODO: Handle no user scenario
  if (!user) {
    throw new Error('Invalid Session');
  }

  const {
    data: transactions,
    loading: transactionLoading,
    error: transactionsError,
    reload,
  } = useAsync(async () => {
    return await transactionsService.getAllTransactions();
  }, [user]);

  if (transactionLoading) {
    return <p>Loading...</p>;
  }

  if (transactionsError) {
    return <p>ERROR!</p>;
  }

  return (
    <>
      {displayTransactionForm ? (
        <Box display={'flex'} flexDirection={'column'}>
          <FileUpload />
          <DividerWithText text={'or'} />
          <TransactionForm
            label="Add Transaction Manually"
            onGoBack={() => setDisplayTransactionForm(false)}
            onSubmit={(data) => createTransaction(data)}
          />
        </Box>
      ) : (
        <TransactionsDetails
          transactions={transactions ?? []}
          onAddTransactionClick={() => setDisplayTransactionForm(true)}
        />
      )}
    </>
  );
}

interface TransactionsDetailsProps {
  transactions: TransactionResponse[];
  onAddTransactionClick: () => void;
}

function TransactionsDetails({
  transactions,
  onAddTransactionClick,
}: TransactionsDetailsProps) {
  const navigate = useNavigate();

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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                hover
                onClick={() => {
                  navigate(`/transactions/${transaction.id}`, {
                    state: { transaction },
                  });
                }}
              >
                <TableCell>
                  {moment(transaction.date).format('DD MMMM yy, HH:mm')}
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
            ))
          ) : (
            <Typography variant={'h6'}>No transactions</Typography>
          )}
        </TableBody>
      </Table>
    </>
  );
}
