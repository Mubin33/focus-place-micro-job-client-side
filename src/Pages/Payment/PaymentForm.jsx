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
  const { email, amount, role } = userData;

  if (isPending) return <Loading />;

  let afterAmount = parseFloat(amount + tk);


  

  let payDollar = ''
    if(tk === 10){
      payDollar = 1
    }else if(tk === 150){
      payDollar = 10
    }else if(tk === 500){
      payDollar = 20
    }else if(tk === 1000){
      payDollar = 35
    }


    const getCurrentDateTime = () => {
      const now = new Date();
    
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(now.getDate()).padStart(2, '0');
    
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Format: YYYY-MM-DD HH:mm:ss
    };
    
    const currentDateTime = getCurrentDateTime(); 
 





  const handleSubmit = async (event) => {
    event.preventDefault();

    


    //for payment collection database
    const paymentInfo ={
      email,
      payAmount:parseInt(payDollar),
      role,
      currentDateTime
    }










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

        await axiosSecure.post(`/payment`, paymentInfo)
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
          {isProcessing ? "Processing..." : `Pay ${payDollar} $ and get ${totalPrice} coin`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
