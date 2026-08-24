import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { loginUser, registerUser } from "./api/authService";
import UserDashboard from "./views/UserDashboard/UserDashboard";
import AdminDashboardTable from "./views/AdminDashboard/AdminDashboardTable";
import GlobalNavbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm";
import "./App.css";

export default function App() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [activeTab, setActiveTab] = useState("profile");
  const [editingUserId, setEditingUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = isLogin
        ? await loginUser(email, password)
        : await registerUser(
            firstName,
            lastName,
            email,
            password,
          );

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            const decoded = jwtDecode(data.token);

            setUserName(
              (decoded.firstName || "") +
                " " +
                (decoded.lastName || ""),
            );
            setUserRole(decoded.role || "USER");
          }
          setIsLoggedIn(true);
          setActiveTab("profile");
          setEditingUserId(null);
          clearFields();
        } else {
          setMessage(
            "Sucesso: Conta criada! Faça login agora.",
          );
          setIsLogin(true);
          clearFields();
        }
      } else {
        setMessage(
          `Erro: ${data.message || "Algo correu mal."}`,
        );
      }
    } catch (error) {
      setMessage(
        "Erro: Não foi possível ligar ao servidor.",
      );
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
    setActiveTab("profile");
    setEditingUserId(null);
    setMessage("");
  };

  function clearFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  const handleEditUserClick = (userId) => {
    setEditingUserId(userId);
    setActiveTab("profile");
  };

  const handleTabChange = (tabName) => {
    if (tabName === "profile") {
      setEditingUserId(null);
    }
    setActiveTab(tabName);
  };

  const handleUpdateRole = async (userId, newRole) => {
  try {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PATCH", // ou PUT, dependendo da sua API
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole })
    });

    if (response.ok) {
      // Atualize o seu estado local de utilizadores aqui se necessário
      setMessage("Função atualizada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
  }
};

  return (
    <div className="app-container">
      <GlobalNavbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <div
        className="main-content"
        style={{ padding: "20px" }}
      >
        {isLoggedIn ? (
          <>
            {userRole === "ADMIN" && (
              <div className="admin-menu-tabs">
                <button
                  onClick={() => handleTabChange("profile")}
                  className={`btn-lang admin-tab-btn ${activeTab === "profile" && !editingUserId ? "active-tab" : ""}`}
                >
                  👤 {t("admin_tab_my_profile")}
                </button>
                <button
                  onClick={() =>
                    handleTabChange("users_list")
                  }
                  className={`btn-lang admin-tab-btn ${activeTab === "users_list" ? "active-tab" : ""}`}
                >
                  📋 {t("admin_tab_list_users")}
                </button>
              </div>
            )}

            {userRole === "ADMIN" &&
            activeTab === "users_list" ? (
              <AdminDashboardTable
                onEditUser={handleEditUserClick}
              />
            ) : (
              <UserDashboard userId={editingUserId} />
            )}
          </>
        ) : (
          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            message={message}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
