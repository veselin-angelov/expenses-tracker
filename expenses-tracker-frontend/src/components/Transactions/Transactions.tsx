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
  Pagination,
} from '@mui/material';
import { TransactionResponse } from 'shared/types';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { TransactionForm } from '../../forms/TransactionForm';
import { DividerWithText } from '../DividerWithText';
import { displayAmountWithCurrency } from '../../lib/displayAmountWithCurrency';
import { FileUpload } from '../FileUpload';

export function Transactions() {
  const user = useCurrentUser();
  const navigate = useNavigate();

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

  const [offset, setOffset] = useState(0);

  const {
    data,
    loading: transactionLoading,
    error: transactionsError,
    reload,
  } = useAsync(async () => {
    // Ideally it wouldn't be a hard coded value
    // and offset would be called currentPage or smn
    // but I cannot be bothered right now
    return await transactionsService.getAllTransactions({
      limit: 15,
      offset: offset * 15,
    });
  }, [user]);

  const onOffsetChange = useCallback(
    (offset: number) => {
      setOffset(offset);
      reload();
    },
    [setOffset, reload],
  );

  const { trigger: createTransactionFromFile, loading: fileCreationLoading } =
    useAsyncAction(async (fileId: string) => {
      const transaction = await transactionsService.createTransactionFromFile({
        receipt: fileId,
      });

      navigate(`/transactions/${transaction.id}`, {
        state: { transaction },
      });
    });

  if (transactionLoading || fileCreationLoading) {
    return <p>Loading...</p>;
  }

  if (transactionsError || !data) {
    return <p>ERROR!</p>;
  }

  return (
    <>
      {displayTransactionForm ? (
        <Box display={'flex'} flexDirection={'column'}>
          <FileUpload onSuccess={createTransactionFromFile} />
          <DividerWithText text={'or'} />
          <TransactionForm
            label="Add Transaction Manually"
            onGoBack={() => setDisplayTransactionForm(false)}
            onSubmit={(data) => createTransaction(data)}
          />
        </Box>
      ) : (
        <TransactionsDetails
          pageCount={data.pageCount}
          offset={offset}
          onOffsetChange={onOffsetChange}
          transactions={data.transactions ?? []}
          onAddTransactionClick={() => setDisplayTransactionForm(true)}
        />
      )}
    </>
  );
}

interface TransactionsDetailsProps {
  pageCount: number;
  offset: number;
  onOffsetChange: (offset: number) => void;
  transactions: TransactionResponse[];
  onAddTransactionClick: () => void;
}

function TransactionsDetails({
  pageCount,
  offset,
  onOffsetChange,
  transactions,
  onAddTransactionClick,
}: TransactionsDetailsProps) {
  const navigate = useNavigate();

  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      onOffsetChange(value - 1);
    },
    [onOffsetChange],
  );

  return (
    <>
      <div className={classes.tableHeader}>
        <Typography variant="h5">Recent Transactions</Typography>
        <Button variant="contained" onClick={onAddTransactionClick}>
          Add Transaction
        </Button>
      </div>
      <Table size="small" sx={{ mt: 5, mb: 5 }}>
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
      <Pagination
        count={pageCount}
        page={offset + 1}
        onChange={handlePageChange}
        color="primary"
      />
    </>
  );
}
