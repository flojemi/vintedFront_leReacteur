import "./LoginPage.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";

export default function LoginPage({ setToken, setLoginVisible }) {
  // TODO : ajouter un loading pour montrer à l'utilisateur qu'une action est en cours

  const navigate = useNavigate();

  // Setup states
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Setup handle functions
  const handleSignupClick = () => {
    setLoginVisible(false);
    navigate("/signup");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      Cookies.set("token", data.data.token);
      setLoginVisible(false);
      setToken(data.data.token);
    } catch (error) {
      setEmail("");
      setPassword("");
      setAlertMessage(`${error.response.data.message}.`);
      console.log("LoginPage - handleSubmit :\n", error);
    }
  };

  // ============================= \\
  // ============================= \\

  // Returned JSX
  return (
    <main className="login-form-container">
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="login-form">Se connecter</label> */}
        <input type="email" className="login-input" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Se connecter" className="green-button" />
        <button className="white-button" onClick={handleSignupClick}>
          Inscris toi !
        </button>
        {alertMessage ? <p>{alertMessage}</p> : ""}
      </form>
    </main>
  );
}
