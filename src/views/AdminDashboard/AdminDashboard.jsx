import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminDashboardTable({ users, onUpdateRole }) {
  const { t } = useTranslation();
  
  // Controla qual a linha que está a ser editada
  const [editingRowId, setEditingRowId] = useState(null);
  // Guarda o valor temporário da Role selecionada
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
          <th>{t("table_header_name") || "Nome"}</th>
          <th>{t("table_header_email") || "Email"}</th>
          <th>{t("table_header_role") || "Role"}</th>
          <th>{t("table_header_actions") || "Ações"}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isCurrentRowEditing = editingRowId === user.id;

          return (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              
              {/* Coluna da Role com Select Traduzido */}
              <td>
                {isCurrentRowEditing ? (
                  <select 
                    value={tempRole} 
                    onChange={(e) => setTempRole(e.target.value)}
                    className="role-select"
                  >
                    <option value="USER">{t("role_user") || "USER"}</option>
                    <option value="ADMIN">{t("role_admin") || "ADMIN"}</option>
                    <option value="EDITOR">{t("role_editor") || "EDITOR"}</option> 
                  </select>
                ) : (
                  <span className={`badge-role ${user.role.toLowerCase()}`}>
                    {user.role === "ADMIN" && (t("role_admin") || "ADMIN")}
                    {user.role === "USER" && (t("role_user") || "USER")}
                    {user.role === "EDITOR" && (t("role_editor") || "EDITOR")}
                  </span>
                )}
              </td>

              {/* Botões de Ação Dinâmicos com Textos/Tooltips Traduzidos */}
              <td>
                {isCurrentRowEditing ? (
                  <div className="action-buttons-row">
                    <button 
                      onClick={() => handleSaveClick(user.id)} 
                      className="btn-save-row"
                      title={t("btn_save") || "Guardar"}
                    >
                      💾 {t("btn_save") || "Guardar"}
                    </button>
                    <button 
                      onClick={handleCancelClick} 
                      className="btn-cancel-row"
                      title={t("btn_cancel") || "Cancelar"}
                    >
                      ❌ {t("btn_cancel") || "Cancelar"}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEditClick(user)} 
                    className="btn-edit-row"
                  >
                    ✏️ {t("btn_edit") || "Editar"}
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
