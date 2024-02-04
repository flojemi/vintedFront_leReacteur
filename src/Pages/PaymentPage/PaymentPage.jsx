import "./PaymentPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Og04uFAXx7fi0dxIyu6FTgzdwK44CnV4uNxrGXk07i1aTH5v4DdwqnxxS4yWXcMbJP4QJFgYdybad56MEOAKtmn004lrDXjfQ"
);

export default function PaymentPage({ token, setLoginVisible }) {
  const location = useLocation();

  const [display, setDisplay] = useState(token ? true : false);

  useEffect(() => {
    // Si pas de token redirige vers l'authentification
    if (!token) setLoginVisible(true);
    if (token) setDisplay(true);
  }, [token]);

  return (
    <main className="PaymentPage-container">
      {!display ? (
        ""
      ) : (
        <div className="checkout-form-container">
          <Elements stripe={stripePromise}>
            <CheckoutForm offerId={location.state.id} />
          </Elements>
        </div>
      )}
    </main>
  );
}
