import { Container, Grid, Typography } from '@mui/material';

import {
  AnalyticsBugReports,
  AnalyticsConversionRates,
  AnalyticsCurrentSubject,
  AnalyticsCurrentVisits,
  AnalyticsItemOrders,
  AnalyticsNewsUpdate,
  AnalyticsNewUsers,
  AnalyticsOrderTimeline,
  AnalyticsTasks,
  AnalyticsTrafficBySite,
  AnalyticsWebsiteVisits,
  AnalyticsWeeklySales,
} from '../../components/_dashboard/general-analytics';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dashboard: Analytics | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWeeklySales />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsNewUsers />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsItemOrders />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
