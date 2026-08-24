import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { loginUser, registerUser } from "./api/authService";
import UserDashboard from "./components/UserDashboard"; // O formulário da imagem
import AdminDashboard from "./components/AdminDashboard"; // A tabela de listagem
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
        <button
          onClick={() => changeLanguage("pt")}
          className="btn-lang"
        >
          🇵🇹 PT
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="btn-lang"
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("de")}
          className="btn-lang"
        >
          🇩🇪 DE
        </button>

        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="btn-logout-nav"
          >
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

  // 🌟 Novo estado para controlar qual ecrã o ADMIN está a ver ("profile" ou "users_list")
  const [activeTab, setActiveTab] = useState("profile");

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
            setUserRole(decoded.role || "CUSTOMER");
          }
          setIsLoggedIn(true);
          setActiveTab("profile"); // Garante que começa no perfil ao entrar
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
    setMessage("");
  };

  function clearFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

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
            {/* 🌟 BOTÕES DE NAVEGAÇÃO: Aparecem fora do form apenas se for ADMIN */}
            {userRole === "ADMIN" && (
              <div
                className="admin-menu-tabs"
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`btn-lang ${activeTab === "profile" ? "active-tab" : ""}`}
                  style={{
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                >
                  👤 Editar Meus Dados
                </button>
                <button
                  onClick={() => setActiveTab("users_list")}
                  className={`btn-lang ${activeTab === "users_list" ? "active-tab" : ""}`}
                  style={{
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                >
                  📋 Listar Todos os Users
                </button>
              </div>
            )}

            {/* Renderização Condicional com base no botão clicado */}
            {userRole === "ADMIN" &&
            activeTab === "users_list" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
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
