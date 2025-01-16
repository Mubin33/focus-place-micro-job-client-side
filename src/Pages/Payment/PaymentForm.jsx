import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import useUserData from '../../Hooks/useUserData/useUserData';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ tk }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const totalPrice = parseFloat(tk);
  const navigate = useNavigate()

  const [userData, isPending,refetch] = useUserData();
  const { email, amount } = userData;

  if (isPending) return <Loading />;

  let afterAmount = parseFloat(amount + tk);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) return; // Prevent double submission
    setIsProcessing(true);

    if (!stripe || !elements) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Stripe.js has not loaded yet.",
      });
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "CardElement not found.",
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Ensure clientSecret is fetched before proceeding
      if (!clientSecret) {
        const { data } = await axiosSecure.post('/create-payment-intent', { price: totalPrice });
        setClientSecret(data.clientSecret);
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: error.message,
        });
        setIsProcessing(false);
        return;
      }

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: confirmError.message,
        });
        setIsProcessing(false);
        return;
      }

      // Payment succeeded, update user amount
      try {
        const response = await axiosSecure.patch(`/users/amount/update/${email}`, { amount: afterAmount });
        console.log('Amount updated successfully:', response.data);
        navigate('/dashboard/paymenthistory')
        refetch()
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was completed successfully!",
        });
      } catch (updateError) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update user amount. Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "An error occurred while processing your payment.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="md:w-6/12 mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: { 
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
