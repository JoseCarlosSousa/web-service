import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import "./App.css";

export default function App() {
  // Estado para controlar se o utilizador já fez login com sucesso
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estados para os formulários
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const API_URL =
    "https://user-service-production-3149.up.railway.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isLogin
      ? "/api/users/login"
      : "/api/users/register";
    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(
        `${API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Se for login, guarda o token e muda de página
          if (data.token) {
            localStorage.setItem("userToken", data.token);
          }
          const decoded = jwtDecode(data.token);
          console.log("Conteúdo do Token:", decoded);
          setUserName(
            decoded.name || decoded.sub || "Utilizador",
          );
          setIsLoggedIn(true); // 👈 Entra na nova página
          // Limpa os campos do formulário
          setEmail("");
          setPassword("");
        } else {
          // Se for registo, avisa que correu bem e muda para o ecrã de login
          setMessage(
            "Sucesso: Conta criada! Faça login agora.",
          );
          setIsLogin(true);
          setName("");
          setEmail("");
          setPassword("");
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

  // Função para fazer logout e voltar ao login
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Apaga o token guardado
    setIsLoggedIn(false); // 👈 Volta para o ecrã de login
    setMessage(""); // Limpa mensagens antigas
  };

  // 1. SE ESTIVER LOGADO: Mostra a nova página com o botão de Logout
 if (isLoggedIn) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* 👈 ALTERA ESTA LINHA AQUI: */}
        <h1>🎉 Bem-vindo, {userName}!</h1> 
        <p>Login efetuado com sucesso na tua aplicação.</p>
        <button onClick={handleLogout} className="logout-btn">
          Sair (Logout)
        </button>
      </div>
    </div>
  );
}

  // 2. SE NÃO ESTIVER LOGADO: Mostra os formulários de Login/Registo normais
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="subtitle">
          Please enter your details to continue
        </p>

        {message && (
          <div className="api-message">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
