import { Box, Typography, useTheme } from '@mui/material';

interface TotalSpendingsProps {
  total: string;
}

export function TotalSpendings({ total }: TotalSpendingsProps) {
  const theme = useTheme();
  return (
    <Box alignSelf={'center'}>
      <Typography variant="h5">
        Spent a total of
        <Typography sx={{ fontSize: 35 }} color={theme.palette.primary.light}>
          {total}
        </Typography>
        in the selected period
      </Typography>
    </Box>
  );
}
