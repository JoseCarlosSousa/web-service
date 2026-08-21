export default function RegisterCard({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
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
        Sign Up
      </button>
    </form>
  );
}
