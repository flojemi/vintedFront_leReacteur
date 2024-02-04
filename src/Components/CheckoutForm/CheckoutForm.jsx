import "./CheckoutForm.css";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

// TODO : Récupérer le token pour identifier l'acheteur en faisant suivre la props
// TODO : transmettre l'ID de l'offre pour vérifier le montant

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [purchaseDone, setPurchaseDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Si les éléments ne sont pas chargés, n'affiche rien
    if (!stripe || !elements) {
      return;
    }

    try {
      // Récupère les informations liés à la CB
      const cardElement = elements.getElement(CardElement);

      // Demande de token auprès de stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id de l'acheteur",
      });

      // Récupération du token dans la réponse
      const stripeToken = stripeResponse.token.id;

      // Transmet le token au back pour vérifications
      const backResponse = await axios.post("http://localhost:3000/pay", {
        stripeToken,
      });

      // Si réponse positive du back, le paiement a réussi
      if (backResponse.data.data.status === "succeeded") {
        setPurchaseDone(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="CheckoutForm-container">
      {!purchaseDone ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <p className="title">Procéder au paiement</p>
          <CardElement />
          <button type="submit" className="green-button">
            Valider
          </button>
        </form>
      ) : (
        <p>Paiement réalisé avec succès</p>
      )}
    </main>
  );
}
