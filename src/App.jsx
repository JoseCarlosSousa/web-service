import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { loginUser, registerUser } from "./api/authService";
import UserDashboard from "./components/UserDashboard"; 
import AdminDashboard from "./components/AdminDashboard"; 
import AuthForm from "./components/AuthForm";
import "./App.css";

function GlobalNavbar({ isLoggedIn, onLogout }) {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="global-nav">
      <div className="nav-logo">🚀 kKósmico Apps</div>
      <div className="nav-lang-container">
        <button onClick={() => changeLanguage("pt")} className="btn-lang">🇵🇹 PT</button>
        <button onClick={() => changeLanguage("en")} className="btn-lang">🇬🇧 EN</button>
        <button onClick={() => changeLanguage("de")} className="btn-lang">🇩🇪 DE</button>

        {isLoggedIn && (
          <button onClick={onLogout} className="btn-logout-nav">
            {t("btn_logout", "Logout")}
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); 
  
  // Controlo de navegação para o ADMIN
  const [activeTab, setActiveTab] = useState("profile");
  const [editingUserId, setEditingUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = isLogin
        ? await loginUser(email, password)
        : await registerUser(firstName, lastName, email, password);

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          if (data.token) {
            localStorage.setItem("token", data.token);
            const decoded = jwtDecode(data.token);
            
            setUserName((decoded.firstName || "") + " " + (decoded.lastName || ""));
            setUserRole(decoded.role || "CUSTOMER"); 
          }
          setIsLoggedIn(true);
          setActiveTab("profile");
          setEditingUserId(null);
          clearFields();
        } else {
          setMessage("Sucesso: Conta criada! Faça login agora.");
          setIsLogin(true);
          clearFields();
        }
      } else {
        setMessage(`Erro: ${data.message || "Algo correu mal."}`);
      }
    } catch (error) {
      setMessage("Erro: Não foi possível ligar ao servidor.");
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

  // Função chamada ao clicar em Editar na tabela de utilizadores
  const handleEditUserClick = (userId) => {
    setEditingUserId(userId);
    setActiveTab("profile"); 
  };

  // Garante a limpeza do ID se o Admin quiser voltar ao seu próprio perfil
  const handleTabChange = (tabName) => {
    if (tabName === "profile") {
      setEditingUserId(null); 
    }
    setActiveTab(tabName);
  };

  return (
    <div className="app-container">
      <GlobalNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="main-content" style={{ padding: "20px" }}>
        {isLoggedIn ? (
          <>
            {userRole === "ADMIN" && (
              <div className="admin-menu-tabs" style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
                <button 
                  onClick={() => handleTabChange("profile")}
                  className={`btn-lang ${activeTab === "profile" && !editingUserId ? "active-tab" : ""}`}
                  style={{ padding: "10px 20px", fontWeight: "bold" }}
                >
                  👤 Editar Meus Dados
                </button>
                <button 
                  onClick={() => handleTabChange("users_list")}
                  className={`btn-lang ${activeTab === "users_list" ? "active-tab" : ""}`}
                  style={{ padding: "10px 20px", fontWeight: "bold" }}
                >
                  📋 Listar Todos os Users
                </button>
              </div>
            )}

            {userRole === "ADMIN" && activeTab === "users_list" ? (
              <AdminDashboard onEditUser={handleEditUserClick} /> 
            ) : (
              <UserDashboard userId={editingUserId} />
            )}
          </>
        ) : (
          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            message={message}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
