import React from "react";
import { useTranslation } from "react-i18next";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

export default function AuthForm({
  isLogin,
  setIsLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  message,
  onSubmit,
}) {
  const { t, i18n } = useTranslation();

  const alterarIdioma = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="auth-container">
      {/* Seletor de Idiomas no topo do Cartão */}
      <div className="lang-selector" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
        <button onClick={() => alterarIdioma("pt")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: i18n.language === "pt" ? "20px" : "16px" }}>🇵🇹</button>
        <button onClick={() => alterarIdioma("en")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: i18n.language === "en" ? "20px" : "16px" }}>🇬🇧</button>
        <button onClick={() => alterarIdioma("de")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: i18n.language === "de" ? "20px" : "16px" }}>🇩🇪</button>
      </div>

      <div className="auth-card">
        <h2>
          {isLogin ? t("welcome_back") : t("create_account")}
        </h2>
        <p className="subtitle">
          {t("enter_details")}
        </p>

        {message && (
          <div className="api-message">{message}</div>
        )}

        {isLogin ? (
          <LoginCard
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
        ) : (
          <RegisterCard
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
        )}

        <p className="toggle-text">
          {isLogin ? t("no_account") : t("has_account")}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t("register_here") : t("login_here")}
          </span>
        </p>
      </div>
    </div>
  );
}
