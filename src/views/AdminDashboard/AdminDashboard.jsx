import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAuthenticatedGet } from "../../api/authService";
import "./AdminDashboard.css";

export default function AdminDashboard({ onEditUser }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthenticatedGet(
      `${import.meta.env.VITE_API_URL}/api/users`,
    )
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
    return (
      <p className="profile-loading">
        {t("loading_users") || "A carregar utilizadores..."}
        ...
      </p>
    );
  }

  return (
    <div className="admin-dashboard-section">
      <h3 className="admin-dashboard-title">
        📋{" "}
        {t("admin_panel_title", "Painel de Administração")}
      </h3>

      {users.length === 0 ? (
        <p>
          {t(
            "no_users_found",
            "Nenhum utilizador encontrado",
          )}
        </p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr className="admin-table-header-row">
              <th className="admin-table-cell">
                {t("table_email", "Email")}
              </th>
              <th className="admin-table-cell">
                {t("table_role", "Função")}
              </th>
              <th className="admin-table-cell">
                {t(
                  "table_customer_name",
                  "Nome do Cliente",
                )}
              </th>
              <th className="admin-table-cell">
                {t("table_status", "Estado")}
              </th>
              <th className="admin-table-cell">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="admin-table-body-row"
              >
                <td className="admin-table-cell">
                  {user.email}
                </td>
                <td className="admin-table-cell">
                  <span className="badge-role">
                    {user.role}
                  </span>
                </td>
                <td
                  className={`admin-table-cell ${user.customer ? "customer-active" : "customer-empty"}`}
                >
                  {user.customer
                    ? user.customer.name
                    : t(
                        "no_customer_profile",
                        "Sem perfil associado",
                      )}
                </td>
                <td className="admin-table-cell">
                  <span
                    className={`status-text ${user.active ? "status-active" : "status-inactive"}`}
                  >
                    {user.active
                      ? t("status_active", "Ativo")
                      : t("status_inactive", "Inativo")}
                  </span>
                </td>
                <td className="admin-table-cell">
                  <button
                    onClick={() => onEditUser(user.id)}
                    className="btn-table-edit"
                  >
                    ✏️ {t("btn_edit")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
