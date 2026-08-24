import { useState, useEffect } from "react";
import AdminDashboardTable from "./AdminDashboardTable"; 

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro no servidor: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.content)) {
          setUsers(data.content); 
        }
      })
      .catch((err) => {
        console.error("Erro ao listar utilizadores da API /api/users:", err);
      });
  }, [API_URL]);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/users/${userId}/role`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        console.error("Não foi possível atualizar a Role no Spring Boot.");
      }
    } catch (error) {
      console.error("Erro na ligação ao endpoint de atualização:", error);
    }
  };

  return (
    <div className="admin-dashboard-view">
      <AdminDashboardTable users={users} onUpdateRole={handleUpdateRole} />
    </div>
  );
}
