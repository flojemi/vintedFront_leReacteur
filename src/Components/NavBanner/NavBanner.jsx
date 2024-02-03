import "./NavBanner.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import logoVinted from "../../assets/logoVinted.svg";

export default function NavBanner({ token, setToken, setLoginVisible }) {
  const navigate = useNavigate();

  // Setup states
  const [isLoading, setIsLoading] = useState(token ? true : false);
  const [userInfos, setUserInfos] = useState(null);

  // En fonction de l'état du token, récupère le nom de l'utilisateur
  // Pour personnaliser le message d'accueil
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3000/user/${token}`);
          setUserInfos(data.data);
          setIsLoading(false);
        } catch (error) {
          console.log("NavBanner - useEffect[token] :\n", error);
        }
      };

      fetchData();
    }
  }, [token]);

  // Handle user logout
  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    navigate("/");
  };

  // Returned Jsx
  return (
    <main className="NavBanner">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <Link to="/">
            <img src={logoVinted} alt="Logo Vinted" className="vinted-logo" />
          </Link>

          <div className="search-bar">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M7 11.5a4.5 4.5 0 1 1 .01-9.01A4.5 4.5 0 0 1 7 11.5zm4.74-.82a6 6 0 1 0-1.06 1.06l3.25 3.25L15 13.93l-3.25-3.25z"></path>
            </svg>
            <input type="text" placeholder="Recherche des articles" className="search-input" />
          </div>

          <div className="white-button-container">
            {token ? (
              <>
                <p>Bienvenue {userInfos ? userInfos.username : ""}</p>
                <button className="red-button" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="white-button">
                  S'inscrire
                </Link>
                <button
                  className="white-button"
                  onClick={() => {
                    setLoginVisible(true);
                  }}
                >
                  Se connecter
                </button>
                {/* <Link to="/login" className="white-button">
                  Se connecter
                </Link> */}
              </>
            )}
          </div>

          <Link to="/publish" className="green-button">
            Vends tes articles
          </Link>
        </>
      )}
    </main>
  );
}
