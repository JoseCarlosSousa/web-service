import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "./Navbar.css";

function Navbar() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">🏍️ kkosmico App</div>
      <div className="lang-container">
        <button onClick={() => changeLanguage("pt")} className="lang-btn">🇵🇹 PT</button>
        <button onClick={() => changeLanguage("en")} className="lang-btn">🇬🇧 EN</button>
        <button onClick={() => changeLanguage("de")} className="lang-btn">🇩🇪 DE</button>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar /> 
      <div style={{ padding: "20px" }}> {/* Podes manter este inline por ser apenas um espaçamento global rápido */}
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}