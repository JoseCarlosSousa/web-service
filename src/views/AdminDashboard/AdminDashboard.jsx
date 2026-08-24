import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminDashboardTable({ users, onUpdateRole }) {
  const { t } = useTranslation();
  
  const [editingRowId, setEditingRowId] = useState(null);
  const [tempRole, setTempRole] = useState("");

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
    <table className="admin-table">
      <thead>
        <tr>
          <th>{t("table_header_name")}</th>
          <th>{t("table_header_email")}</th>
          <th>{t("table_header_role")}</th>
          <th>{t("table_header_actions")}</th>
        </tr>
      </thead>
      <tbody>
        {/* Adicionada a validação "users ? ..." para impedir o quebra com undefined */}
        {users && users.length > 0 ? (
          users.map((user) => {
            const isCurrentRowEditing = editingRowId === user.id;

            return (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                
                <td>
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
                    <span className={`badge-role ${user.role ? user.role.toLowerCase() : ""}`}>
                      {user.role === "ADMIN" && t("role_admin")}
                      {user.role === "MANAGER" && t("role_manager")}
                      {user.role === "USER" && t("role_user")}
                      {user.role === "EDITOR" && t("role_editor")}
                    </span>
                  )}
                </td>
                
                <td>
                  {isCurrentRowEditing ? (
                    <div className="action-buttons-row">
                      <button 
                        onClick={() => handleSaveClick(user.id)} 
                        className="btn-save-row"
                        title={t("btn_save")}
                      >
                        💾 {t("btn_save")}
                      </button>
                      <button 
                        onClick={handleCancelClick} 
                        className="btn-cancel-row"
                        title={t("btn_cancel")}
                      >
                        ❌ {t("btn_cancel")}
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleEditClick(user)} 
                      className="btn-edit-row"
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
            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
              {t("loading_users") || "A carregar utilizadores..."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
