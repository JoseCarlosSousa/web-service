import { useTranslation } from "react-i18next";
import { AVAILABLE_LANGUAGES } from "../../constants/countries";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, onLogout }) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="global-nav">
      <div className="nav-logo">🚀 kKósmico Apps</div>
      <div className="nav-lang-container">
        
        <select 
          value={i18n.language} 
          onChange={handleLanguageChange}
          className="lang-dropdown"
        >
          {AVAILABLE_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="btn-logout-nav"
          >
            {t("btn_logout", "Logout")}
          </button>
        )}
      </div>
    </nav>
  );
}
