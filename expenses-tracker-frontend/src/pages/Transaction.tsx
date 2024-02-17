import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { TransactionResponse } from 'shared/types';
import { displayAmountWithCurrency } from '../lib/displayAmountWithCurrency';
import { TransactionForm } from '../forms/TransactionForm';
import { useState } from 'react';
import { transactionsService } from '../services/transactions-service';
import { useAsyncAction } from '../hooks/useAsyncAction';
import moment from 'moment';
import { useAsync } from '../hooks/useAsync';

export function Transaction() {
  const { id: transactionId } = useParams();

  const {
    data: transaction,
    loading: transactionLoading,
    reload,
  } = useAsync(
    async () =>
      await transactionsService.getTransactionById(transactionId ?? ''),
    [],
  );

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const { trigger: editTransaction } = useAsyncAction(async (data) => {
    await transactionsService.editTransactionById(transaction?.id ?? '', data);
    setIsEditFormOpen(false);
    reload();
  });

  if (transactionLoading || !transaction) {
    return <>Loading...</>;
  }

  return (
    <Paper>
      {!isEditFormOpen ? (
        <TransactionDetails
          transaction={transaction}
          onEditClick={() => setIsEditFormOpen(true)}
        />
      ) : (
        <TransactionForm
          onGoBack={() => setIsEditFormOpen(false)}
          transaction={transaction}
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
      <Container>
        <Typography variant="body1">{transaction.description}</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Merchant"
              secondary={transaction.merchantName ?? 'N/A'}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Merchant Address"
              secondary={transaction.merchantAddress ?? 'N/A'}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Date"
              secondary={
                moment(transaction.date).format('DD MMMM yy, HH:mm') ?? 'N/A'
              }
            />
          </ListItem>
        </List>
      </Container>
    </Box>
  );
}
