import { useTranslation } from "react-i18next";

export default function RegisterCard({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <label>{t("first_name_label")}</label>
        <input
          type="text"
          placeholder={t("first_name_placeholder")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>{t("last_name_label")}</label>
        <input
          type="text"
          placeholder={t("last_name_placeholder")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>{t("email_label")}</label>
        <input
          type="email"
          placeholder={t("email_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>{t("password_label")}</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {t("sign_up_btn")}
      </button>
    </form>
  );
}
