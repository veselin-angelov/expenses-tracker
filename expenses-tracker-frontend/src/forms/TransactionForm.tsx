import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CurrencyEnum } from 'shared/enums';
import { TransactionResponse } from 'shared/types';

interface TransactionFormProps {
  onGoBack: () => void;
  transaction?: TransactionResponse;
  label?: string;
  onSubmit: (data: TransactionResponse) => void;
}

export function TransactionForm({
  onGoBack,
  transaction,
  label = 'Edit transaction',
  onSubmit,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionResponse>({
    defaultValues: transaction,
  });

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Typography variant={'h6'} justifySelf={'center'}>
        {label}
      </Typography>
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="merchantName"
            label="Merchant Name"
            variant="outlined"
            {...register('merchantName')}
          />
        </Grid>
        <Grid item justifySelf={'center'} xs={12} sm={6}>
          <TextField
            id="merchantAddress"
            label="Merchant Address"
            variant="outlined"
            {...register('merchantAddress')}
          />
        </Grid>
        <Grid item justifySelf={'center'} xs={12} sm={6}>
          <Controller
            name="date"
            control={control}
            rules={{ required: false }}
            render={({ field: { value, ref } }) => (
              <TextField
                id="date"
                label="Date and Time"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={!!errors.date}
                helperText={errors.date ? 'This field is required' : ''}
                value={value}
                inputRef={ref}
                {...register('date')}
              />
            )}
          />
        </Grid>
        <Grid item justifySelf={'center'} xs={12} sm={6}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            {...register('description')}
          />
        </Grid>
        <Grid item justifySelf={'center'} xs={12} sm={6}>
          <TextField
            id="amount"
            label="Amount"
            variant="outlined"
            {...register('amount', { required: true })}
            error={!!errors.amount}
            helperText={errors.amount ? 'This field is required' : ''}
          />
        </Grid>
        <Grid item justifySelf={'center'} xs={12} sm={6}>
          <FormControl sx={{ m: 1, width: '120px' }}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              label="Currency"
              defaultValue={transaction?.currency ?? ''}
              {...register('currency', { required: true })}
              error={!!errors.currency}
            >
              {Object.values(CurrencyEnum).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Button onClick={onGoBack}>Go Back</Button>
        <Button type="submit" variant="contained" size={'large'} sx={{ m: 1 }}>
          Submit
        </Button>
      </Grid>
    </Box>
  );
}
