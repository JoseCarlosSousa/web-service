import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAuthenticatedGet } from "../api/authService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthenticatedGet(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users list:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>{t("loading_users")}...</p>;
  }

  return (
    <div className="admin-dashboard-section">
      <h3 className="admin-dashboard-title">
        📋 {t("admin_panel_title")}
      </h3>

      {users.length === 0 ? (
        <p>{t("no_users_found")}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr className="admin-table-header-row">
              <th className="admin-table-cell">{t("table_email")}</th>
              <th className="admin-table-cell">{t("table_role")}</th>
              <th className="admin-table-cell">{t("table_customer_name")}</th>
              <th className="admin-table-cell">{t("table_status")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="admin-table-body-row">
                <td className="admin-table-cell">{user.email}</td>
                <td className="admin-table-cell">
                  <span className="badge-role">{user.role}</span>
                </td>
                <td
                  className={`admin-table-cell ${
                    user.customer ? "customer-active" : "customer-empty"
                  }`}
                >
                  {user.customer
                    ? user.customer.name
                    : t("no_customer_profile")}
                </td>
                <td className="admin-table-cell">
                  <span
                    className={`status-text ${
                      user.active ? "status-active" : "status-inactive"
                    }`}
                  >
                    {user.active
                      ? t("status_active")
                      : t("status_inactive")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
