import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { BaseCard, OrderCard } from '~/components';
import { objPropsToLowerCase } from '~/global';
import { useOrder } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

export const Order = () => {
  const { getAllBuyerOrders } = useOrder();
  const [orders, setOrders] = useState([]);
  const { openLoader, closeLoader } = useLoader();
  const [count, setCount] = useState(1);

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

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Container maxWidth='md'>
      <BaseCard className='mt-20'>
        <h1 className=''>All Orders</h1>
        {orders?.map((order, index) => {
          return (
            <>
              <OrderCard className='mt-15' key={index} order={objPropsToLowerCase(order)} />
            </>
          );
        })}
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
