import "./OffersCarrousel.css";

import { useNavigate } from "react-router-dom";

export default function OffersCarrousel({ offersData }) {
  const navigate = useNavigate();

  // Capture le clic sur une carte du carrousel
  const handleClick = function (offerId, event) {
    navigate(`/offer/${offerId}`);
  };

  // console.log("OffersCarrousel - offersData ===>\n", offersData);

  // Returned Jsx
  return (
    <main className="OffersCarrousel-Container">
      {offersData.map((offer) => {
        // Parcours chaque offre pour créer un carrousel
        const isSeveralsImage = offer.product_image.length > 1;

        return (
          <div className="carrousel-card" key={offer._id} onClick={(event) => handleClick(offer._id, event)}>
            <p>{offer.owner.account.username}</p>
            <img
              src={isSeveralsImage ? offer.product_image[0] : offer.product_image[0]}
              alt={`Image représentative du produit : ${offer.product_name}`}
            />
            <p>{offer.product_price} €</p>
          </div>
        );
      })}
    </main>
  );
}
