import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

// Pages
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import OfferPage from "./Pages/OfferPage/OfferPage";
import PublishPage from "./Pages/PublishPage/PublishPage";

// Components
import NavBanner from "./Components/NavBanner/NavBanner";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Récupération du token
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) setToken(tokenFromCookie);
  }, []);

  return (
    <Router>
      <NavBanner token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage setToken={setToken} />}></Route>
        <Route path="/signup" element={<SignupPage setToken={setToken} />}></Route>
        <Route path="/offer/:id" element={<OfferPage />}></Route>
        <Route path="/publish" element={<PublishPage token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
