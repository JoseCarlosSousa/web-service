import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { loginUser, registerUser } from "./api/authService";
import DashboardCard from "./components/DashboardCard";
import AuthForm from "./components/AuthForm";
import "./App.css";

// 🌟 Atualizado: Agora recebe isLoggedIn e onLogout como propriedades
function GlobalNavbar({ isLoggedIn, onLogout }) {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#2ecc71",
    },
    langContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    btn: {
      padding: "6px 14px",
      border: "1px solid #dee2e6",
      borderRadius: "6px",
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
    },
    btnLogout: {
      padding: "6px 14px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#e74c3c",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
      marginLeft: "10px",
      transition: "background-color 0.2s",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🚀 kkosmico App</div>
      <div style={styles.langContainer}>
        <button
          onClick={() => changeLanguage("pt")}
          style={styles.btn}
        >
          🇵🇹 PT
        </button>
        <button
          onClick={() => changeLanguage("en")}
          style={styles.btn}
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("de")}
          style={styles.btn}
        >
          🇩🇪 DE
        </button>

        {/* 🌟 O botão de logout aparece aqui apenas se o utilizador estiver autenticado */}
        {isLoggedIn && (
          <button
            onClick={onLogout}
            style={styles.btnLogout}
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
      {/* 🌟 Passagem dos estados para controlo do botão dentro da Navbar */}
      <GlobalNavbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <div
        className="main-content"
        style={{ padding: "20px" }}
      >
        {isLoggedIn ? (
          <DashboardCard
            userName={userName}
            onLogout={handleLogout}
          />
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
