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
import PaymentPage from "./Pages/PaymentPage/PaymentPage";

// Components
import NavBanner from "./Components/NavBanner/NavBanner";

// ============================== \\
// ============ APP ============= \\
// ============================== \\

function App() {
  const [token, setToken] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  // Lecture d'un éventuel token
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) setToken(tokenFromCookie);
  }, []);

  // Returned Jsx
  return (
    <Router>
      <div
        className={`app-wrapper ${loginVisible && "blur"}`}
        onClick={() => {
          loginVisible && setLoginVisible(false);
        }}
      ></div>
      <NavBanner token={token} setToken={setToken} setLoginVisible={setLoginVisible} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage setToken={setToken} />}></Route>
        <Route path="/offer/:id" element={<OfferPage />}></Route>
        <Route path="/publish" element={<PublishPage token={token} setLoginVisible={setLoginVisible} />}></Route>
        <Route path="/payment" element={<PaymentPage token={token} setLoginVisible={setLoginVisible} />}></Route>
      </Routes>
      {loginVisible && <LoginPage setToken={setToken} setLoginVisible={setLoginVisible} />}
    </Router>
  );
}

export default App;
