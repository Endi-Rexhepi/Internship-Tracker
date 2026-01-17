import { useState } from "react";
import api from "../api";

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onAuth(res.data.user);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="soft-card">
      <div className="soft-header p-3 fw-semibold">Login</div>
      <div className="p-3">
        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit} className="d-grid gap-2">
          <label className="subtle" style={{ fontSize: 13 }}>
            Email
          </label>
          <input
            className="form-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="subtle mt-2" style={{ fontSize: 13 }}>
            Password
          </label>
          <input
            className="form-control"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary pill mt-2">Login</button>

          <div className="subtle" style={{ fontSize: 12 }}>
            Your session is secured with JWT.
          </div>
        </form>
      </div>
    </div>
  );
}

