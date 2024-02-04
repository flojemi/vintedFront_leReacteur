import "./PaymentPage.css";

import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51Og04uFAXx7fi0dxIyu6FTgzdwK44CnV4uNxrGXk07i1aTH5v4DdwqnxxS4yWXcMbJP4QJFgYdybad56MEOAKtmn004lrDXjfQ"
);

export default function PaymentPage() {
  const location = useLocation();

  return (
    <main className="PaymentPage-container">
      <div className="checkout-form-container">
        <Elements stripe={stripePromise}>
          <CheckoutForm offerId={location.state.id} />
        </Elements>
      </div>
    </main>
  );
}
