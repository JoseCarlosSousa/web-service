import { useTranslation } from "react-i18next";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

export default function AuthForm({
  isLogin,
  setIsLogin,
  firstName,
  setFirstName,
  lastName,
  setLastName,
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
      <div
        className="language-switcher"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "15px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => i18n.changeLanguage("pt")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            transition: "transform 0.2s",
            opacity: i18n.language.startsWith("pt")
              ? 1
              : 0.4,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          🇵🇹
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            transition: "transform 0.2s",
            opacity: i18n.language.startsWith("en")
              ? 1
              : 0.4,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          🇬🇧
        </button>
        <button
          onClick={() => i18n.changeLanguage("de")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            transition: "transform 0.2s",
            opacity: i18n.language.startsWith("de")
              ? 1
              : 0.4,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          🇩🇪
        </button>
      </div>

      <div className="auth-card">
        <h2>
          {isLogin
            ? t("welcome_back")
            : t("create_account")}
        </h2>
        <p className="subtitle">{t("enter_details")}</p>

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
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
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
