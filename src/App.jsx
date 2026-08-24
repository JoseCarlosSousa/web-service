import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { loginUser, registerUser } from "./api/authService";
import DashboardCard from "./components/DashboardCard";
import AdminDashboard from "./components/AdminDashboard"; // 🌟 Importe o seu componente de Admin aqui
import AuthForm from "./components/AuthForm";
import "./App.css";

function GlobalNavbar({ isLoggedIn, onLogout }) {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="global-nav">
      <div className="nav-logo">🚀 kkosmico App</div>
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
  const [userRole, setUserRole] = useState(""); // 🌟 Novo estado para guardar o cargo (ADMIN, CUSTOMER, etc.)

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

            // 🌟 Guarda o nome completo
            setUserName(
              (decoded.firstName || "") +
                " " +
                (decoded.lastName || ""),
            );

            // 🌟 Guarda o Role vindo de dentro do Token (verifique se a chave no seu backend se chama 'role')
            setUserRole(decoded.role || "USER");
          }
          setIsLoggedIn(true);
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
    setUserRole(""); // 🌟 Limpa o role no logout
    setMessage("");
  };

  function clearFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  // 🌟 Função auxiliar para decidir qual dashboard renderizar com base no Role
  const renderDashboardBasedOnRole = () => {
    if (userRole === "ADMIN") {
      return <AdminDashboard onLogout={handleLogout} />;
    }
    // Caso contrário, vai para a view normal do utilizador/cliente
    return (
      <DashboardCard
        userName={userName}
        onLogout={handleLogout}
      />
    );
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
          /* 🌟 Agora chama a função que valida as permissões do Role */
          renderDashboardBasedOnRole()
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
