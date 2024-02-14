import { Copyright } from '@mui/icons-material';
import { Box, Toolbar, Container, Grid, Paper } from '@mui/material';
import { Transactions } from '../components/Transactions/Transactions';
import { TransactionForm } from '../forms/TransactionForm';
import { useState } from 'react';

export function Home() {
  const [displayTransactionForm, setDisplayTransactionForm] = useState(false);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              {/* <Chart /> */}
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
              {/* <Deposits /> */}
            </Paper>
          </Grid>
          {/* Recent Transactions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {displayTransactionForm ? (
                <TransactionForm
                  onGoBack={() => setDisplayTransactionForm(false)}
                />
              ) : (
                <Transactions
                  onAddTransactionClick={() => setDisplayTransactionForm(true)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
