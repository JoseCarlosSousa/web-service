import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAuthenticatedGet } from "../api/authService";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users and nested customers from the API Gateway
    fetchAuthenticatedGet("/api/users")
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
    <div
      className="admin-dashboard-section"
      style={{ marginTop: "20px" }}
    >
      <h3
        style={{
          borderBottom: "2px solid #2ecc71",
          paddingBottom: "10px",
        }}
      >
        📋 {t("admin_panel_title")}
      </h3>

      {users.length === 0 ? (
        <p>{t("no_users_found")}</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8f9fa",
                textAlign: "left",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              <th style={{ padding: "12px" }}>
                {t("table_email")}
              </th>
              <th style={{ padding: "12px" }}>
                {t("table_role")}
              </th>
              <th style={{ padding: "12px" }}>
                {t("table_customer_name")}
              </th>
              <th style={{ padding: "12px" }}>
                {t("table_status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                <td style={{ padding: "12px" }}>
                  {user.email}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#e8f4fd",
                      color: "#007bff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: user.customer
                      ? "#2c3e50"
                      : "#95a5a6",
                  }}
                >
                  {user.customer
                    ? user.customer.name
                    : t("no_customer_profile")}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      color: user.active
                        ? "#2ecc71"
                        : "#e74c3c",
                      fontWeight: "bold",
                    }}
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
