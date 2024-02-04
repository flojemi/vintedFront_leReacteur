import "./PaymentPage.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Og04uFAXx7fi0dxIyu6FTgzdwK44CnV4uNxrGXk07i1aTH5v4DdwqnxxS4yWXcMbJP4QJFgYdybad56MEOAKtmn004lrDXjfQ"
);

export default function PaymentPage() {
  return (
    <main className="PaymentPage-container">
      <div className="checkout-form-container">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}
