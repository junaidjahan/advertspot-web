import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BaseCard } from '~/components';
import { useGig, useJob, useProposal } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';
import { usePayment } from '~/hooks/use-payment';
import { userState } from '~/state';
import StripCheckoutForm from '../stripcheckout';

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { createPaymentIntent } = usePayment();
  let { id } = useParams();
  const { getGigById } = useGig();
  const { getProposalById } = useProposal();
  const { openLoader, closeLoader } = useLoader();
  const [user, setUser] = useRecoilState(userState);
  const [order, setOrder] = useState({
    sellerId: null,
    buyerId: null,
    status: null,
    amount: null,
    gigId: null,
    jobId: null
  });

  const getGigOrJob = async () => {
    openLoader();
    const gigById = await getGigById(id);
    if (gigById?.gig?._id) {
      const order = {
        sellerId: gigById?.gig?.sellerId,
        buyerId: user.id,
        status: 'In Progress',
        amount: gigById?.gig?.price,
        gigId: gigById?.gig?._id,
        jobId: null
      };
      setOrder(order);
    }
    if (!gigById?.gig?._id) {
      console.log('Inside proposal');
      const proposalById = await getProposalById(id);
      const order = {
        sellerId: proposalById?.proposal?.UserId,
        buyerId: user.id,
        status: 'In Progress',
        amount: proposalById?.proposal?.Amount,
        gigId: null,
        jobId: proposalById?.proposal?.JobId
      };
      setOrder(order);
    }
    closeLoader();
  };

  useEffect(() => {
    setStripePromise(
      loadStripe(
        'pk_test_51MrI82AmbpoZqKjE6t7WDa5x03C01SzQyJ7ncERRkwau7n5J1txbsYUVIyBrPewucTvAwm7wGoE0AHDbvB9P0Jeu00tYDQ24TU'
      )
    );
    getGigOrJob();
  }, []);

  const paymentIntent = async () => {
    openLoader();
    const { client_secret } = await createPaymentIntent({
      Amount: order?.amount,
      Currency: 'usd'
    });
    setClientSecret(client_secret);
    closeLoader();
  };

  useEffect(() => {
    paymentIntent();
  }, [order]);

  return (
    <div style={{ padding: 50 }}>
      <h1 style={{ fontWeight: '500' }}>Checkout</h1>

      <div>
        {clientSecret && stripePromise && (
          <BaseCard className='mx-10 mt-20'>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripCheckoutForm order={order} />
            </Elements>
          </BaseCard>
        )}
      </div>
    </div>
  );
};
