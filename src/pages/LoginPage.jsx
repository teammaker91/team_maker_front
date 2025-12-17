import { useState } from "react";
import './LoginPage.css';

function LoginPage({ onClose, defaultTab = "login" }) {
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("login-overlay")) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = tab === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = tab === "login" 
        ? { email, password } 
        : { username, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <== send cookies automatically
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Something went wrong");
        return;
      }

      // User info returned, cookies already set in browser
      console.log("Logged in/register success:", data.user);

      onClose(); // close modal after success
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className="login-overlay" onClick={handleClickOutside}>
      <div className="login-wrapper" onClick={e => e.stopPropagation()}>

        <div className="tabs">
          <div className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
            Login
          </div>
          <div className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>
            Sign Up
          </div>
        </div>

        <form className="login-modal" onSubmit={handleSubmit}>
          {tab === "register" && (
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit" className="login-btn">
            {tab === "login" ? "Login" : "Create Account"}
          </button>
          {error && <p className="error-msg">{error}</p>}
          <button type="button" onClick={onClose} className="close-btn">
            Stay as guest
          </button>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;
