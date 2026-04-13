import { useState } from "react";
import api from "../api";

export default function Register({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (form.name.trim().length < 2) return setErr("Name must be at least 2 characters.");
    if (form.password.length < 8) return setErr("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");

    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        name: form.name.trim(),
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onAuth(res.data.user);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="soft-card">
      <div className="soft-header p-3 fw-semibold">Create Account</div>
      <div className="p-3">
        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit} className="d-grid gap-2">
          <label className="subtle" style={{ fontSize: 13 }}>Name</label>
          <input
            className="form-control"
            placeholder="Your name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            minLength={2}
          />

          <label className="subtle mt-2" style={{ fontSize: 13 }}>Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="subtle mt-2" style={{ fontSize: 13 }}>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="At least 8 characters"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={8}
          />

          <label className="subtle mt-2" style={{ fontSize: 13 }}>Confirm Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Repeat your password"
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            required
          />

          <button className="btn btn-primary pill mt-2" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>

          <div className="subtle" style={{ fontSize: 12 }}>
            Your password is hashed with bcrypt and never stored in plain text.
          </div>
        </form>
      </div>
    </div>
  );
}
