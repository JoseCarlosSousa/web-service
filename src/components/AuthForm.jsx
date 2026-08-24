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
  const { t } = useTranslation();

  return (
    <div className="auth-container">
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
