import { useEffect, useMemo, useState } from "react";
import api from "./api";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import Dashboard from "./components/Dashboard";
import KanbanBoard from "./components/KanbanBoard";

import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [apps, setApps] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const [authMode, setAuthMode] = useState("login"); 
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setApps([]);
    setStatusFilter("All");
    setErrors(null);
  };

  const fetchApps = async () => {
    try {
      setErrors(null);
      setLoading(true);
      const params = statusFilter === "All" ? {} : { status: statusFilter };
      const res = await api.get("/api/applications", { params });
      setApps(res.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        logout();
        return;
      }
      setErrors("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchApps();
  }, [statusFilter, user]);

  const counts = useMemo(() => {
    const base = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    apps.forEach((a) => base[a.status]++);
    return base;
  }, [apps]);

  const handleCreate = async (payload) => {
    try {
      setErrors(null);
      await api.post("/api/applications", payload);
      fetchApps();
    } catch (e) {
      if (e?.response?.status === 401) {
        logout();
        return;
      }
      setErrors("Could not create application. Make sure Company/Role are at least 2 characters.");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      setErrors(null);
      await api.put(`/api/applications/${id}`, { status });
      fetchApps();
    } catch (e) {
      if (e?.response?.status === 401) {
        logout();
        return;
      }
      setErrors("Could not update status.");
    }
  };

  const handleMove = async (id, status) => {
    await handleUpdateStatus(id, status);
  };

  const handleDelete = async (id) => {
    try {
      setErrors(null);
      await api.delete(`/api/applications/${id}`);
      fetchApps();
    } catch (e) {
      if (e?.response?.status === 401) {
        logout();
        return;
      }
      setErrors("Could not delete application.");
    }
  };

  if (!user) {
    return (
      <div className="container py-5 container-max">
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.25)",
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              IT
            </div>
          </div>

          <h2 className="m-0">Internship Tracker</h2>
          <div className="subtle">Log in to track your applications with a Kanban board.</div>

          <div className="mt-3 d-flex justify-content-center gap-2">
            <button
              className={`btn btn-sm pill px-3 ${
                authMode === "login" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setAuthMode("login")}
            >
              Login
            </button>
            <button
              className={`btn btn-sm pill px-3 ${
                authMode === "register" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {authMode === "login" ? (
              <Login
                onAuth={(u) => {
                  setUser(u);
                  setAuthMode("login");
                }}
              />
            ) : (
              <Register
                onAuth={(u) => {
                  setUser(u);
                  setAuthMode("login");
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 container-max">
      {/* Top Navbar Card */}
      <div className="soft-card mb-3">
        <div className="soft-header p-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: 42,
                height: 42,
                borderRadius: 16,
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.25)",
                fontWeight: 900,
              }}
            >
              IT
            </div>
            <div>
              <h4 className="m-0">Internship Tracker</h4>
              <div className="subtle" style={{ fontSize: 13 }}>
                Welcome, <span className="fw-semibold">{user.name}</span>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <select
              className="form-select"
              style={{ width: 210 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Filter list view"
            >
              <option value="All">All (list)</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button className="btn btn-outline-secondary pill px-3" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {errors && <div className="alert alert-danger">{errors}</div>}

      <Dashboard counts={counts} />

      <KanbanBoard apps={apps} onMove={handleMove} />

      <div className="row g-3 mt-2">
        <div className="col-md-5">
          <div className="soft-card p-3">
            <div className="fw-semibold mb-2">Add Application</div>
            <ApplicationForm onCreate={handleCreate} />
          </div>
        </div>

        <div className="col-md-7">
          <div className="soft-card p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-semibold">List View</div>
              <div className="subtle" style={{ fontSize: 13 }}>
                Filter: {statusFilter}
              </div>
            </div>

            <ApplicationList
              apps={apps}
              loading={loading}
              statusFilter={statusFilter}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <div className="subtle mt-3" style={{ fontSize: 12 }}>
        Tip: Kanban always shows all apps. The dropdown only filters the List section.
      </div>
    </div>
  );
}
