import { Grid, Paper } from '@mui/material';
import { Transactions } from '../components/Transactions/Transactions';
import { SpendingsChart } from '../components/SpendingsChart';
import { useState } from 'react';
import { TotalSpendings } from '../components/TotalSpendings';

export function Home() {
  const [totalSpending, setTotalSpending] = useState<string>();

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <SpendingsChart onDataChange={(total) => setTotalSpending(total)} />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <TotalSpendings total={totalSpending ?? ''} />
        </Paper>
      </Grid>
      {/* Recent Transactions */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Transactions />
        </Paper>
      </Grid>
    </Grid>
  );
}
