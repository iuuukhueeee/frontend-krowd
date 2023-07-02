import ReactApexChart from 'react-apexcharts';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import { Icon } from '@iconify/react';
import {
  alpha,
  Box,
  Card,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { ApexOptions } from 'apexcharts';

import { fNumber, fPercent } from '@/utils/formatNumber';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

const CHART_DATA = [
  { data: [2532, 6632, 4132, 8932, 6332, 2532, 4432, 1232, 3632, 932, 3354] },
];

export interface WalletProps {
  title: React.ReactNode;
  total: number;
  percent: number;
  chartOptions?: ApexOptions;
}

export default function Wallet({
  title,
  percent,
  total,
  chartOptions,
}: WalletProps) {
  const theme = useTheme();

  const _chartOptions: ApexOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),

        title: {
          formatter: (seriesName: number | string) => `#${seriesName}`,
        },
      },
      marker: { show: false },
    },
    ...chartOptions,
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 1 }}
        >
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Icon
              width={16}
              height={16}
              icon={percent >= 0 ? trendingUpFill : trendingDownFill}
            />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={_chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}
