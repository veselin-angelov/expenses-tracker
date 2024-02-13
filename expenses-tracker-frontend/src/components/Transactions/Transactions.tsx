import moment from 'moment';
import { useCurrentUser } from '../../contexts/UserContext';
import { useAsync } from '../../hooks/useAsync';
import { transactionsService } from '../../services/transactions-service';
import classes from './Transactions.module.css';

export function Transactions() {
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
    <div className="transactions">
      {transactions &&
        transactions.map((transaction) => (
          <li
            className={classes.item}
            key={transaction.id}
          >{`${transaction.merchantName}, ${transaction.amount} - ${moment(transaction.date).format('DD/MM/YY, HH:mm')}`}</li>
        ))}
    </div>
  );
}
