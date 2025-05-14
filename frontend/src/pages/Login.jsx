import { useState } from "react";
import API_BASE_URL from "../apiConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data)); // save user
      navigate("/"); // redirect to weather page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="glass-card weather-container">
    <form onSubmit={handleLogin} >
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="search-box"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="search-box"/>
      <button type="submit" className="search_button">Login</button>
      {error && <p style={{ color: "red" }} className="search_error">{error}</p>}
    </form>
    </div>
  );
}
