import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserDashboard from "./components/UserDashboard"; // Ajuste o caminho se necessário
import AdminDashboard from "./components/AdminDashboard"; // Ajuste o caminho se necessário

// Componente global da Navbar com os botões de idiomas
function Navbar() {
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
      fontFamily: "system-ui, -apple-system, sans-serif"
    },
    logo: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#2cc71",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    langContainer: {
      display: "flex",
      gap: "10px"
    },
    btn: {
      padding: "6px 14px",
      border: "1px solid #dee2e6",
      borderRadius: "6px",
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
      transition: "background-color 0.2s"
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🚀 kKósmico Apps</div>
      <div style={styles.langContainer}>
        <button onClick={() => changeLanguage("pt")} style={styles.btn}>🇵🇹 PT</button>
        <button onClick={() => changeLanguage("en")} style={styles.btn}>🇬🇧 EN</button>
        <button onClick={() => changeLanguage("de")} style={styles.btn}>🇩🇪 DE</button>
      </div>
    </nav>
  );
}

// Componente Raiz da Aplicação unificando a estrutura
export default function App() {
  return (
    <Router>
      {/* A Navbar fica fora de Routes para aparecer fixa em todos os ecrãs */}
      <Navbar /> 
      
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Pode adicionar aqui a rota padrão de Login/Home */}
        </Routes>
      </div>
    </Router>
  );
}
