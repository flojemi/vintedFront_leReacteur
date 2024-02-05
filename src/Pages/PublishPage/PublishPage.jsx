import "./PublishPage.css";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function PublishPage({ token, setLoginVisible }) {
  const fileInputRef = useRef();

  useEffect(() => {
    if (!token) setLoginVisible(true);
  }, []);

  // Setup states
  const [offerImage, setOfferImage] = useState({});
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerBrand, setOfferBrand] = useState("");
  const [offerSize, setOfferSize] = useState("");
  const [offerColor, setOfferColor] = useState("");
  const [offerCondition, setOfferCondition] = useState("");
  const [offerPlace, setOfferPlace] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [publishSuccessful, setPublishSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // Monte l'objet formData
      const formData = new FormData();
      formData.append("picture", offerImage);
      formData.append("title", offerTitle);
      formData.append("description", offerDescription);
      formData.append("price", offerPrice);
      formData.append("brand", offerBrand);
      formData.append("size", offerSize);
      formData.append("color", offerColor);
      formData.append("condition", offerCondition);
      formData.append("city", offerPlace);

      // Exécution de la requête
      await axios.post("http://localhost:3000/offer/publish", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Remise à zéro des states
      setOfferImage({});
      fileInputRef.current.value = "";
      setOfferTitle("");
      setOfferDescription("");
      setOfferBrand("");
      setOfferSize("");
      setOfferColor("");
      setOfferCondition("");
      setOfferPlace("");
      setOfferPrice("");

      setPublishSuccessful(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Returned Jsx

  // TODO : refactoriser en créant deux composants (formulaire et message successful) afin de gagner en lisibilité
  // TOFIX : en profiter pour retravailler le loader afin qu'il s'affiche correctement

  /* 
  - Première vérification si le token est présent
  - Deuxième vérification si une offre a été postée avec succès
  - Sinon affiche le formulaire
  */

  return (
    <main className="PublishPage-container">
      {!token ? (
        ""
      ) : publishSuccessful ? (
        <div className={isLoading ? "loader" : "publish-form"}>
          <p>L'offre a été publiée</p>
          <button
            onClick={() => {
              setPublishSuccessful(false);
            }}
          >
            Publier une nouvelle offre
          </button>
        </div>
      ) : (
        <>
          <label htmlFor="publish-form" className="title">
            Vends ton article
          </label>
          <form id="publish-form" className={isLoading ? "loader" : "publish-form"} onSubmit={handleSubmit}>
            <div className="form-part">
              <div className="form-item">
                <label htmlFor="offerImage">Ajouter une image</label>
                <input
                  id="offerImage"
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    setOfferImage(event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="form-part">
              <div className="form-item">
                <label htmlFor="offerTitle">Titre</label>
                <input
                  id="offerTitle"
                  className="publish-input"
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={offerTitle}
                  onChange={(event) => {
                    setOfferTitle(event.target.value);
                  }}
                />
              </div>
              <div className="separator" />
              <div className="form-item">
                <label htmlFor="offerDescription">Décris ton article</label>
                <input
                  id="offerDescription"
                  className="publish-input"
                  type="text"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={offerDescription}
                  onChange={(event) => {
                    setOfferDescription(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-part">
              <div className="form-item">
                <label htmlFor="offerBrand">Marque</label>
                <input
                  id="offerBrand"
                  className="publish-input"
                  type="text"
                  placeholder="ex: Zara"
                  value={offerBrand}
                  onChange={(event) => {
                    setOfferBrand(event.target.value);
                  }}
                />
              </div>
              <div className="separator" />
              <div className="form-item">
                <label htmlFor="offerSize">Taille</label>
                <input
                  id="offerSize"
                  className="publish-input"
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  value={offerSize}
                  onChange={(event) => {
                    setOfferSize(event.target.value);
                  }}
                />
              </div>
              <div className="separator" />
              <div className="form-item">
                <label htmlFor="offerColor">Couleur</label>
                <input
                  id="offerColor"
                  className="publish-input"
                  type="text"
                  placeholder="ex: Fushia"
                  value={offerColor}
                  onChange={(event) => {
                    setOfferColor(event.target.value);
                  }}
                />
              </div>
              <div className="separator" />
              <div className="form-item">
                <label htmlFor="offerShape">État</label>
                <input
                  id="offerShape"
                  className="publish-input"
                  type="text"
                  placeholder="ex: Neuf avec étiquette"
                  value={offerCondition}
                  onChange={(event) => {
                    setOfferCondition(event.target.value);
                  }}
                />
              </div>
              <div className="separator" />
              <div className="form-item">
                <label htmlFor="offerPlace">Lieu</label>
                <input
                  id="offerPlace"
                  className="publish-input"
                  type="text"
                  placeholder="ex: Paris"
                  value={offerPlace}
                  onChange={(event) => {
                    setOfferPlace(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-part">
              <div className="form-item">
                <label htmlFor="offerPrice">Prix</label>
                <input
                  id="offerPrice"
                  className="publish-input"
                  type="text"
                  placeholder="0,00 €"
                  value={offerPrice}
                  onChange={(event) => {
                    setOfferPrice(event.target.value);
                  }}
                />
              </div>
            </div>

            <input type="submit" className="green-button" value="Ajouter" />
          </form>
        </>
      )}
    </main>
  );
}
