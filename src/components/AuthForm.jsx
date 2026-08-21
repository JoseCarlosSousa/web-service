import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

export default function AuthForm({
  isLogin,
  setIsLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  message,
  onSubmit,
}) {
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

        {isLogin ? (
          <LoginCard
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
        ) : (
          <RegisterCard
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
        )}

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
