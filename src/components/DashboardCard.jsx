export default function DashboardCard({ userName, onLogout }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>🎉 Bem-vindo, {userName}!</h1>
        <p>Login efetuado com sucesso na tua aplicação.</p>
        <button onClick={onLogout} className="logout-btn">
          Sair (Logout)
        </button>
      </div>
    </div>
  );
}
