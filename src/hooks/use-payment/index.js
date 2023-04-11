import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, userState } from '~/state';
import { useAxios } from '../use-axios';

export const usePayment = () => {
  const { post, get } = useAxios();

  const user = useRecoilValue(userState);

  const createPaymentIntent = async paymentData => {
    {
      try {
        const paymentIntent = await post('/payment', paymentData);
        return paymentIntent;
      } catch {}
    }
  };

  return {
    createPaymentIntent
  };
};
