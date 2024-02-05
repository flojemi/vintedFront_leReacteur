import "./HomePage.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import OffersCarrousel from "../../Components/OffersCarrousel/OffersCarrousel";

import heroBanner from "../../assets/hero-banner.jpg";
import axios from "axios";

export default function HomePage() {
  // Setup states
  const [isLoading, setIsLoading] = useState(true);
  const [offersData, setOffersData] = useState([]);

  // TODO : Utilisation de ce state pour configurer des boutons qui permettent de naviguer sur le carrousel
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data at first loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://site--backvinted-lereacteur--s9nznht574vq.code.run/offers");
        setOffersData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Jsx retourné (forme un carrousel composé de cartes qui représentent les offres)
  return (
    <main>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="hero-container">
            <img
              src={heroBanner}
              alt="Image d'accroche représentant une femme heureuse dans sa penderie : hashtag sexisme"
              className="hero-img"
            />

            <Link to="/publish" className="hero-button">
              Commencer à vendre
            </Link>
          </div>
          <OffersCarrousel offersData={offersData} />
        </>
      )}
    </main>
  );
}
