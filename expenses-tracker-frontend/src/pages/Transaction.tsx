import { Box, Button, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { TransactionResponse } from 'shared/types';
import { displayAmountWithCurrency } from '../lib/displayAmountWithCurrency';
import { TransactionForm } from '../forms/TransactionForm';
import { useState } from 'react';
import { transactionsService } from '../services/transactions-service';
import { useAsyncAction } from '../hooks/useAsyncAction';

interface LocationState {
  transaction: TransactionResponse;
}

export function Transaction() {
  const location = useLocation();
  const { transaction } = location.state as LocationState;

  const [displayTransaction, setDisplayTransaction] = useState(transaction);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const { trigger: editTransaction } = useAsyncAction(async (data) => {
    const transactionResponse = await transactionsService.editTransactionById(
      transaction.id,
      data,
    );
    setIsEditFormOpen(false);
    setDisplayTransaction(transactionResponse);
  });

  return (
    <Paper>
      {!isEditFormOpen ? (
        <TransactionDetails
          transaction={displayTransaction}
          onEditClick={() => setIsEditFormOpen(true)}
        />
      ) : (
        <TransactionForm
          onGoBack={() => setIsEditFormOpen(false)}
          transaction={displayTransaction}
          onSubmit={(data) => editTransaction(data)}
        />
      )}
    </Paper>
  );
}

interface TransactionDetailsProps {
  transaction: TransactionResponse;
  onEditClick: () => void;
}

function TransactionDetails({
  transaction,
  onEditClick,
}: TransactionDetailsProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} sx={{ m: 10 }}>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'5px'}
        justifyContent={'space-between'}
      >
        <Typography variant="h3">
          {displayAmountWithCurrency(transaction.amount, transaction.currency)}
        </Typography>
        <Button onClick={() => onEditClick()} variant={'outlined'}>
          Edit
        </Button>
      </Box>
      <Typography variant="body1">{transaction.description}</Typography>
    </Box>
  );
}
