import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { BaseCard, BaseChart } from '~/components';
import { setCircleGaugeData, setPiarChartdata } from '~/global';
import { USER_TYPE, barChartOptions, circleGauge, lineChartData, pieChartoptions } from '~/global/constants';
import { useOrder } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const BuyerAnalytics = () => {
  const { getOrdersByMonth, mapBarChartData, getOrderCount, orderPercentage, earningsAndSpendings, mapLineChartData } =
    useOrder();
  const { openLoader, closeLoader } = useLoader();
  const [orderByMonth, setOrderByMonth] = useState({});
  const [orderCountByType, setOrderCountByType] = useState({});
  const [orderPercentageByType, setOrderPercentageByType] = useState({});
  const [spendings, setSpendings] = useState({});

  const getByMonth = () => {
    openLoader();
    getOrdersByMonth(USER_TYPE.BUYER)
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
    getOrderCount(USER_TYPE.BUYER)
      .then(res => {
        setOrderPercentageByType(setCircleGaugeData(circleGauge, orderPercentage(res)));
        setOrderCountByType(setPiarChartdata(pieChartoptions, res));
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getEarningsSpendings = () => {
    openLoader();
    earningsAndSpendings(USER_TYPE.BUYER)
      .then(res => {
        setSpendings(mapLineChartData(lineChartData, res));
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
    <div>
      <Container maxWidth='lg' className='pb-50' style={{ position: 'relative' }}>
        <h1
          style={{ fontSize: '6rem', fontWeight: '500', paddingLeft: '1rem', color: '#dfdfdf', position: 'absolute' }}
        >
          ANALYTICS
        </h1>
        <Box style={{ marginTop: '4.9rem', zIndex: 10, position: 'absolute' }}>
          <BaseCard className='mt-20 mb-20'>
            <Grid container direction='row'>
              <Grid className=' mt-30' xs={12} md={6} item>
                <BaseCard variant='' style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}>
                  <p>Orders percentage by type</p>
                </BaseCard>
                <BaseChart options={JSON.parse(JSON.stringify(orderPercentageByType))} id='order-type-by-percent' />
              </Grid>
              <Grid xs={12} md={6} item className='mt-35'>
                <BaseCard
                  className=''
                  variant=''
                  style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}
                >
                  <p>Orders count by type</p>
                </BaseCard>
                <BaseChart options={JSON.parse(JSON.stringify(orderCountByType))} id='order-by-type' />
              </Grid>
              <Grid xs={12} item>
                <BaseCard
                  className=''
                  variant=''
                  style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}
                >
                  <p>Orders placed by month</p>
                </BaseCard>
                <BaseChart
                  className='light-shadow'
                  style={{ width: '1000px !important' }}
                  options={JSON.parse(JSON.stringify(orderByMonth))}
                  id='order-by-month'
                />
              </Grid>

              <Grid xs={12} item className='mt-20'>
                <BaseCard variant='' style={{ backgroundColor: '#b892ff', color: 'white', width: 'max-content' }}>
                  <p>Amount spent by month</p>
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
