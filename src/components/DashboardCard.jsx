import React from "react";
import { useTranslation } from "react-i18next";

export default function DashboardCard({ userName, onLogout }) {
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* Adicionado o style para corrigir a quebra e sobreposição da linha verde */}
        <h1 style={{ fontSize: "28px", lineHeight: "1.4", color: "#2ecc71" }}>
          🎉 {t("welcome")}, {userName}!
        </h1>
        <p>{t("success_msg")}</p>
        <button onClick={onLogout} className="logout-btn">
          {t("logout")}
        </button>
      </div>
    </div>
  );
}
