import React from "react";
import { useTranslation } from "react-i18next";

export default function RegisterCard({
  name,
  setName,
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
        <label>{t("full_name_label")}</label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>{t("email_label")}</label>
        <input
          type="email"
          placeholder="name@example.com"
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
