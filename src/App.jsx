import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "./api/authService";
import DashboardCard from "./components/DashboardCard";
import AuthForm from "./components/AuthForm";
import "./App.css";

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
        : await registerUser(firstName, lastName, email, password);

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          if (data.token) {
            localStorage.setItem("userToken", data.token);
            const decoded = jwtDecode(data.token);
            setUserName(decoded.firstName + " " + decoded.lastName);
          }
          setIsLoggedIn(true);
          clearFilds();
        } else {
          setMessage("Sucesso: Conta criada! Faça login agora.");
          setIsLogin(true);
          clearFilds();
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
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setMessage("");
  };

  if (isLoggedIn) {
    return <DashboardCard userName={userName} onLogout={handleLogout} />;
  }

  return (
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
  );

  function clearFilds() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }
}
