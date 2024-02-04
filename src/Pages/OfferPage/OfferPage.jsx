import "./OfferPage.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OfferPage() {
  // TODO : Implémenter la gestion de plusieurs images

  const navigate = useNavigate();

  // Get id from params
  const { id } = useParams();

  // Setup states
  const [offerData, setOfferData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data at first loading
  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await axios.get(`http://localhost:3000/offer/${id}`);
        setOfferData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleBuy = () => {
    navigate(`/payment`, { state: { id } });
  };

  // Returned Jsx
  return (
    <main className="OfferPage-container">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="img-container">
            <img src={offerData.product_image[0]} alt="Image descriptive du produit" />
          </div>

          <div className="product-description">
            <p className="offer-price">{offerData.product_price} €</p>
            <div>
              {offerData.product_details.map((detailObj, index) => {
                const objKeys = Object.keys(detailObj)[0];

                return (
                  <div key={index} className="product-details-container">
                    <p className="key-detail">{objKeys}</p>
                    <p className="value-detail">{detailObj[objKeys]}</p>
                  </div>
                );
              })}
            </div>
            <div className="separator"></div>
            <div className="product-description-2">
              <p className="offer-name">{offerData.product_name}</p>
              <p>{offerData.product_description}</p>
            </div>
            <button className="green-button" onClick={handleBuy}>
              Acheter
            </button>
          </div>
        </>
      )}
    </main>
  );
}
