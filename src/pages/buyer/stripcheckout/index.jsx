import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '~/components';
import { useOrder, useSnackbar } from '~/hooks';
import { useLoader } from '~/hooks/use-loader';

const StripCheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { saveOrder } = useOrder();
  const { openLoader, closeLoader } = useLoader();
  const navigate = useNavigate();
  const { open } = useSnackbar();

  const createOrder = async () => {
    openLoader();
    try{
      await saveOrder(order);
      open('Order placed successfully!')
    }catch{
      open("Something went wrong!")
    }

    closeLoader();
    navigate('/buyer/dashboard');
  };

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required'
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
    } else {
      createOrder();
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <BaseButton type='submit' variant='contained' className='mt-20'>
        Submit
      </BaseButton>
    </form>
  );
};

export default StripCheckoutForm;
