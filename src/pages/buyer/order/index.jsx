import { Box, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton, BaseCard, BaseChart, OrderCard } from '~/components';
import { objPropsToLowerCase, setPiarChartdata } from '~/global';
import { USER_TYPE, pieChartoptions } from '~/global/constants';
import { useOrder } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const Order = () => {
  const { getAllBuyerOrders, getOrderCount } = useOrder();
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { openLoader, closeLoader } = useLoader();
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState(pieChartoptions);
  const navigate = useNavigate();

  const getAllOrders = () => {
    openLoader();
    getAllBuyerOrders()
      .then(res => {
        setOrders(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  const getChartData = () => {
    openLoader();
    getOrderCount(USER_TYPE.BUYER)
      .then(res => {
        setChartData(res);
      })
      .finally(() => {
        closeLoader();
      });
  };

  useEffect(() => {
    setOptions(setPiarChartdata(options, chartData));
  }, [chartData]);

  useEffect(() => {
    getAllOrders();
    getChartData();
  }, []);

  return (
    <Container maxWidth='xl'>
      <BaseCard className='mt-20'>
        <Grid container direction='row'>
          <Grid item xs={12} md={8}>
            <h1 className=''>All Orders</h1>
            {orders?.map((order, index) => {
              return (
                <OrderCard
                  handleChange={() => {
                    getAllOrders();
                    getChartData();
                  }}
                  className='mt-15'
                  key={index}
                  order={order}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <BaseChart options={options} id='order-by-type' />
              <Box style={{ textAlign: 'center', marginTop: '30px' }}>
                <BaseButton
                  style={{ textAlign: 'center' }}
                  variant='outlined'
                  onClick={() => {
                    navigate('/buyer/analytics');
                  }}
                >
                  View Analytics
                </BaseButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </BaseCard>
    </Container>
  );
};

const style = {
  categoryDrop: {
    width: 400,
    mx: 2
  },
  jobsContainer: {
    backgroundColor: 'lightGrey.main',
    p: 2,
    my: 2,
    borderRadius: 5
  },
  jobCard: {
    my: 2
  }
};
