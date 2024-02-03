import "./SignupPage.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

export default function SignupPage({ setToken }) {
  const navigate = useNavigate();

  // Setup states
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Handle Functions
  const handleUsernameChange = (event) => {
    if (!username) setAlertMessage("");
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    if (!email) setAlertMessage("");
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    if (!password) setAlertMessage("");
    setPassword(event.target.value);
  };

  const handleNewsletterChange = (event) => {
    setNewsletter(!newsletter);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Alertes émises vers l'utilisateur si complétude incorrecte
    if (!username) return setAlertMessage("Vous devez renseigner un nom d'utilisateur");
    if (!email) return setAlertMessage("Vous devez renseigner une adresse email valide");
    if (!password) return setAlertMessage("Vous devez renseigner un mot de passe");

    // Inscription de l'utilisateur
    try {
      setIsLoading(true);

      const { data } = await axios.post("http://localhost:3000/user/signup", {
        username,
        email,
        password,
        newsletter,
      });

      // Gestion du token retourné
      Cookies.set("token", data.data.token);
      setToken(data.data.token);

      // Navigue vers la HomePage
      navigate("/");
    } catch (error) {
      console.log("error ==>\n", error);
      console.log("message ==>\n", error.response.data.message);
    }
  };

  return (
    <main className="signup-form-container">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>S'inscrire</p>
          <form onSubmit={handleSubmit} className="form-itself">
            <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={handleUsernameChange} />
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input type="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />

            <div className="newsletter_container">
              <input type="checkbox" id="newsletter" checked={newsletter} onChange={handleNewsletterChange} />
              <label htmlFor="newsletter">S'inscrire à le newsletter</label>
            </div>

            <input type="submit" value="Valider l'inscription" />

            <p>En m'inscrivant, je souscris sans réserves aux CGU. Je certifie également avoir plus de 18 ans.</p>
            {alertMessage ? <p>{alertMessage}</p> : ""}

            <Link to="/login"> Tu as déjà un compte ? Connecte toi !</Link>
          </form>
        </>
      )}
    </main>
  );
}
