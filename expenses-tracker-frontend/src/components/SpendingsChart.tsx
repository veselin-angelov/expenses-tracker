import { ChartsTextStyle, LineChart, axisClasses } from '@mui/x-charts';
import { useAsync } from '../hooks/useAsync';
import { Period, statisticsService } from '../services/statistics-service';
import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { MultiToggle } from './TripleToggle';

interface SpendingsChartProps {
  onDataChange: (total: string) => void;
}

export function SpendingsChart({ onDataChange }: SpendingsChartProps) {
  const theme = useTheme();
  const [period, setPeriod] = useState<Period>('weekly');

  const periods = useMemo(
    () => [
      {
        value: 'Weekly',
        onSelect: () => setPeriod('weekly'),
      },
      {
        value: 'Monthly',
        onSelect: () => setPeriod('monthly'),
      },
      {
        value: 'Yearly',
        onSelect: () => setPeriod('yearly'),
      },
    ],
    [setPeriod],
  );

  const { data, error, loading } = useAsync(async () => {
    return await statisticsService.getSpendings({
      // TODO: NOT GOOD HARDCODED
      year: '2024',
      period,
      week: period === 'weekly' ? '7' : undefined,
      month: period === 'monthly' ? '2' : undefined,
    });
  }, [period]);

  useEffect(() => {
    onDataChange(data?.total ?? '');
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (!data || error) {
    return <>ERROR!</>;
  }

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h5">
          {/* TODO: Extract in a function */}
          {`${period[0].toUpperCase() + period.slice(1)}`}
        </Typography>
        <MultiToggle choices={periods} />
      </Box>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data.results.map((_) => ({
            period: _.period,
            label: _.display,
            total: Number(_.total),
          }))}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'period',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Spending',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'total',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </>
  );
}
