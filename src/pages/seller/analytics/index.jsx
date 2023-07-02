import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { BaseCard, BaseChart } from '~/components';
import { setCircleGaugeData, setPiarChartdata } from '~/global';
import { USER_TYPE, barChartOptions, circleGauge, lineChartData, pieChartoptions } from '~/global/constants';
import { useOrder } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const SellerAnalytics = () => {
  const {
    getOrdersByMonth,
    mapBarChartData,
    getOrderCount,
    orderPercentage,
    earningsAndSpendings,
    mapLineChartData,
    mapCustomGauge,
    totalAmount
  } = useOrder();
  const { openLoader, closeLoader } = useLoader();
  const [orderByMonth, setOrderByMonth] = useState({});
  const [orderCountByType, setOrderCountByType] = useState({});
  const [orderPercentageByType, setOrderPercentageByType] = useState({});
  const [jobSuccess, setJobSuccess] = useState({});
  const [spendings, setSpendings] = useState({});
  const [totalEarning, setTotalEarning] = useState();

  const getByMonth = () => {
    openLoader();
    getOrdersByMonth(USER_TYPE.SELLER)
      .then(res => {
        const monthOrders = mapBarChartData(barChartOptions, res);
        setOrderByMonth(monthOrders);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getOrderCountByType = () => {
    openLoader();
    getOrderCount(USER_TYPE.SELLER)
      .then(res => {
        setOrderPercentageByType(setCircleGaugeData(circleGauge, orderPercentage(res)));
        setOrderCountByType(setPiarChartdata(pieChartoptions, res));
        setJobSuccess(mapCustomGauge(orderPercentage(res).Completed));
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getEarningsSpendings = () => {
    openLoader();
    earningsAndSpendings(USER_TYPE.SELLER)
      .then(res => {
        setSpendings(mapLineChartData(lineChartData, res));
        setTotalEarning(totalAmount(res));
      })
      .finally(() => {
        closeLoader();
      });
  };

  useEffect(() => {
    getByMonth();
    getOrderCountByType();
    getEarningsSpendings();
  }, []);

  return (
    <div style={{ paddingBottom: '50px' }}>
      <Container maxWidth='lg' className='pb-50' style={{ position: 'relative', marginBottom: '50px' }}>
        <h1
          style={{ fontSize: '6rem', fontWeight: '500', paddingLeft: '1rem', color: '#dfdfdf', position: 'absolute' }}
        >
          ANALYTICS
        </h1>
        <Box style={{ marginTop: '4.9rem', zIndex: 10, position: 'absolute' }}>
          <BaseCard className='mt-20'>
            <Grid container direction='row'>
              {/* <Grid className='mt-30' style={{ height: '20rem' }} md={6} xs={12} item>
                <BaseCard
                  variant=''
                  className='pt-10'
                  style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}
                >
                  <p>Total Earnings</p>
                </BaseCard>
                <Box className='center-column' style={{ height: '100%' }}>
                  <BaseCard
                    variant=''
                    className='app-shadow center-row'
                    style={{ width: '70%', height: '50%', fontWeight: '700', fontSize: '45px', color: 'rgb(0,50,190)' }}
                  >
                    {totalEarning} Pkr
                  </BaseCard>
                </Box>
              </Grid> */}
              <Grid xs={12} md={6} item className='mt-35'>
                <BaseCard
                  className=''
                  variant=''
                  style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}
                >
                  <p>Orders count by type</p>
                </BaseCard>
                <BaseChart
                  style={{ height: '28rem' }}
                  options={JSON.parse(JSON.stringify(orderCountByType))}
                  id='order-by-type'
                />
              </Grid>
              {/* <Grid style={{ height: '20rem' }} className=' mt-30' md={6} xs={12} item>
                <BaseCard variant='' style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}>
                  <p>Job Success Rate</p>
                </BaseCard>
                <BaseChart options={jobSuccess} id='job-success' style={{ height: '300px' }} />
              </Grid> */}

              <Grid style={{ height: '28rem' }} className=' mt-30' xs={12} md={6} item>
                <BaseCard variant='' style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}>
                  <p>Orders percentage by type</p>
                </BaseCard>
                <BaseChart options={JSON.parse(JSON.stringify(orderPercentageByType))} id='order-type-by-percent' />
              </Grid>

              <Grid className='mt-20' xs={12} md={6} item>
                <BaseCard
                  className=''
                  variant=''
                  style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}
                >
                  <p>Orders placed by month</p>
                </BaseCard>
                <BaseChart
                  className='light-shadow'
                  style={{ height: '28rem' }}
                  options={JSON.parse(JSON.stringify(orderByMonth))}
                  id='order-by-month'
                />
              </Grid>

              <Grid style={{ height: '28rem' }} xs={12} md={6} item className='mt-20'>
                <BaseCard variant='' style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}>
                  <p>Amount earned by month</p>
                </BaseCard>
                <BaseChart
                  style={{ width: '1000px !important' }}
                  options={JSON.parse(JSON.stringify(spendings))}
                  id='spendings-by-month'
                />
              </Grid>
            </Grid>
          </BaseCard>
        </Box>
      </Container>
    </div>
  );
};
