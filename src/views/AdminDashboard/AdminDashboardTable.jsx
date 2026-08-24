import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./AdminDashboard.css"; // Os estilos da tabela e do carregamento vêm todos daqui

export default function AdminDashboardTable({ users, onUpdateRole }) {
  const { t } = useTranslation();
  
  const [editingRowId, setEditingRowId] = useState(null);
  const [tempRole, setTempRole] = useState("");

  // Log de monitorização na consola do navegador
  useEffect(() => {
    console.log("Dados recebidos na tabela (users):", users);
  }, [users]);

  const handleEditClick = (user) => {
    setEditingRowId(user.id);
    setTempRole(user.role);
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setTempRole("");
  };

  const handleSaveClick = (userId) => {
    onUpdateRole(userId, tempRole);
    setEditingRowId(null);
  };

  return (
    <div className="table-responsive-container">
      <table className="admin-table">
        <thead>
          <tr className="admin-table-header-row">
            <th className="admin-table-cell">{t("table_header_name")}</th>
            <th className="admin-table-cell">{t("table_header_email")}</th>
            <th className="admin-table-cell">{t("table_header_role")}</th>
            <th className="admin-table-cell">{t("table_header_actions")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => {
              if (!user) return null;
              const isCurrentRowEditing = editingRowId === user.id;

              return (
                <tr key={user.id || Math.random()} className="admin-table-body-row">
                  <td className="admin-table-cell">
                    {user.firstName || ""} {user.lastName || ""}
                  </td>
                  <td className="admin-table-cell">
                    {user.email || ""}
                  </td>
                  <td className="admin-table-cell">
                    {isCurrentRowEditing ? (
                      <select 
                        value={tempRole} 
                        onChange={(e) => setTempRole(e.target.value)}
                        className="role-select"
                      >
                        <option value="USER">{t("role_user")}</option>
                        <option value="ADMIN">{t("role_admin")}</option>
                        <option value="MANAGER">{t("role_manager")}</option>
                        <option value="EDITOR">{t("role_editor")}</option> 
                      </select>
                    ) : (
                      <span className="badge-role">
                        {user.role === "ADMIN" && t("role_admin")}
                        {user.role === "MANAGER" && t("role_manager")}
                        {user.role === "USER" && t("role_user")}
                        {user.role === "EDITOR" && t("role_editor")}
                      </span>
                    )}
                  </td>
                  <td className="admin-table-cell">
                    {isCurrentRowEditing ? (
                      <div className="action-buttons-row">
                        <button 
                          onClick={() => handleSaveClick(user.id)} 
                          className="btn-table-edit"
                          title={t("btn_save")}
                        >
                          💾 {t("btn_save")}
                        </button>
                        <button 
                          onClick={handleCancelClick} 
                          className="btn-table-edit"
                          title={t("btn_cancel")}
                        >
                          ❌ {t("btn_cancel")}
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditClick(user)} 
                        className="btn-table-edit"
                      >
                        ✏️ {t("btn_edit")}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="admin-table-cell table-no-data">
                {t("loading_users") || "A carregar utilizadores..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
