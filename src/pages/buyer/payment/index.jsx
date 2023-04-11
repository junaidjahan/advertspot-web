import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCard } from '~/components';
import { useGig, useJob } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { usePayment } from '~/hooks/use-payment';
import StripCheckoutForm from '../stripcheckout';

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { createPaymentIntent } = usePayment();
  let { id } = useParams();
  const { getGigById } = useGig();
  const { getById } = useJob();
  const { openLoader, closeLoader } = useLoader();

  const getGigOrJob = async () => {
    openLoader();
    const gigById = await getGigById(id);
    if (!gigById.gig._id) {
      const jobById = await getById(id);
    }
    closeLoader();
  };

  useEffect(() => {
    setStripePromise(
      loadStripe(
        'pk_test_51MrI82AmbpoZqKjE6t7WDa5x03C01SzQyJ7ncERRkwau7n5J1txbsYUVIyBrPewucTvAwm7wGoE0AHDbvB9P0Jeu00tYDQ24TU'
      )
    );
  }, []);

  const paymentIntent = async () => {
    openLoader();
    const { client_secret } = await createPaymentIntent({
      Amount: '500',
      Currency: 'usd'
    });
    setClientSecret(client_secret);
    closeLoader();
  };

  useEffect(() => {
    getGigOrJob();
    paymentIntent();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1 style={{ fontWeight: '500' }}>Checkout</h1>

      <div>
        {clientSecret && stripePromise && (
          <BaseCard className='mx-10 mt-20'>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripCheckoutForm />
            </Elements>
          </BaseCard>
        )}
      </div>
    </div>
  );
};
