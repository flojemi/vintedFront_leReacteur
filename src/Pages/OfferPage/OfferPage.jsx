import "./OfferPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OfferPage() {
  // TODO : Implémenter la gestion de plusieurs images

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

  // Returned Jsx
  return (
    <main className="OfferPage-container">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="img-container">
            <img src={offerData.product_image} alt="Image descriptive du produit" />
          </div>
          <div className="product-description">
            <p>{offerData.product_price} €</p>
            <div>
              {offerData.product_details.map((detailObj, index) => {
                const objKeys = Object.keys(detailObj)[0];

                return (
                  <div key={index} className="product-details-container">
                    <p>{objKeys}</p>
                    <p>{detailObj[objKeys]}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <p>{offerData.product_name}</p>
              <p>{offerData.product_description}</p>
            </div>
            <button>Acheter</button>
          </div>
        </>
      )}
    </main>
  );
}
