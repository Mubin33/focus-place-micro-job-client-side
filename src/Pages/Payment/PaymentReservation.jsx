import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; 
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";
import Title from "../../Components/Title/Title";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_SECRET_KEY}`);

const PaymentReservation = () => {
  const {tk} = useParams() 
  const mainTaka = parseInt(tk)
  return (
    <>
    <Title title={'Card information'} subtitle={"Any card"}/>
    <Elements stripe={stripePromise}>
      <PaymentForm tk={mainTaka}/>
    </Elements>
    </>
  );
};
 
export default PaymentReservation;