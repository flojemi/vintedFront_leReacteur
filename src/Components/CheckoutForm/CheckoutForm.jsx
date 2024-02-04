import "./CheckoutForm.css";

import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

// TODO : Récupérer le token pour identifier l'acheteur en faisant suivre la props
// TODO : transmettre l'ID de l'offre pour vérifier le montant et la dispo de l'offre

export default function CheckoutForm({ offerId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [offerData, setOfferData] = useState(null);
  const [alreadySold, setAlreadySold] = useState(false);
  const [purchaseDone, setPurchaseDone] = useState(false);

  //   console.log("Checkout Form - offerId ==>", offerId);

  // Au chargement du composant vérifie que l'offre est toujours disponible
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/offer/${offerId}`);
        console.log(data.data);
        setOfferData(data.data);
      } catch (error) {
        console.log(error.response.data.message);
        setAlreadySold(true);
      }
    };

    fetchData();
  }, []);

  // A la soumission du formulaire, vérifie la dispo de l'offre avant de traiter la paiement
  const handleSubmit = async (event) => {
    event.preventDefault();

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
        offerData,
      });

      // Si réponse positive du back, le paiement a réussi
      if (backResponse.data.data.status === "succeeded") {
        setPurchaseDone(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Returned Jsx
  return (
    <main>
      {alreadySold ? (
        <p>😢 Cette offre n'existe plus ou a déjà été vendue.</p>
      ) : (
        <div className="checkout-container">
          <div className="checkout-summary">
            <p className="checkout-summary-title">Résumé de la commande</p>
            <div className="checkout-summary-item">
              <p>Commande</p>
              <p>{offerData.product_price} €</p>
            </div>
            <div className="checkout-summary-item">
              <p>Frais protection acheteurs</p>
              <p>0.40 €</p>
            </div>
            <div className="checkout-summary-item">
              <p>Frais de ports</p>
              <p>0.80 €</p>
            </div>
            <div className="separator" />
            <div className="checkout-summary-item">
              <p>Total</p>
              <p>{(Number(offerData.product_price) + 0.4 + 0.8).toFixed(2)} €</p>
            </div>
            {/* <p>{`Il ne vous reste plus qu'une étape pour vous offrir ${offerData.product_name}. Vous allez payer ${(
              Number(offerData.product_price) +
              0.4 +
              0.8
            ).toFixed(2)} € (frais de protection et frais de port inclus)`}</p> */}
          </div>
          <div className="pay-container">
            {purchaseDone ? (
              <p>Paiement réalisé avec succès</p>
            ) : (
              <form onSubmit={handleSubmit} className="checkout-form">
                <p className="title">Procéder au paiement</p>
                <CardElement />
                <button type="submit" className="green-button">
                  Valider
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
