import { useAxios } from '../use-axios';
import { useSnackbar } from '../use-snackbar';

export const useOrder = () => {
  const { post, get } = useAxios();
  const { open } = useSnackbar();

  const saveOrder = async orderData => {
    {
      try {
        return await post('/order', orderData);
      } catch {}
    }
  };

  const getAllBuyerOrders = async () => {
    {
      try {
        const orders = await get(`/order/all-buyer-orders`);
        return orders;
      } catch {}
    }
  };

  const getAllSellerOrders = async () => {
    {
      try {
        const orders = await get(`/order/all-seller-orders`);
        return orders;
      } catch {}
    }
  };

  return {
    saveOrder,
    getAllBuyerOrders,
    getAllSellerOrders
  };
};
