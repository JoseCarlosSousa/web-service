import { useTranslation } from "react-i18next";
import "./Navbar.css";

// Alterado para export default para o App.jsx o conseguir importar facilmente
export default function Navbar({ isLoggedIn, onLogout }) {
  // 🌟 ADICIONADO O 't' AQUI PARA AS TRADUÇÕES FUNCIONAREM!
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="global-nav">
      <div className="nav-logo">🚀 kKósmico Apps</div>
      <div className="nav-lang-container">
        <button
          onClick={() => changeLanguage("pt")}
          className="btn-lang"
        >
          🇵🇹 PT
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="btn-lang"
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("de")}
          className="btn-lang"
        >
          🇩🇪 DE
        </button>

        {/* O t("btn_logout") agora vai funcionar sem erros */}
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
