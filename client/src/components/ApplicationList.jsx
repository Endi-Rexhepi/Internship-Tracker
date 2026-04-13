import { useState } from "react";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationList({
  apps,
  loading,
  statusFilter,
  onUpdateStatus,
  onUpdateFull,
  onDelete,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (app) => {
    setEditingId(app._id);
    setEditForm({
      company: app.company,
      role: app.role,
      link: app.link || "",
      notes: app.notes || "",
      dateApplied: app.dateApplied
        ? new Date(app.dateApplied).toISOString().split("T")[0]
        : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (id) => {
    onUpdateFull(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const onEditChange = (e) =>
    setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  if (loading) return <div className="subtle">Loading…</div>;

  if (apps.length === 0)
    return <div className="subtle">No applications found.</div>;

  return (
    <div className="d-grid gap-2">
      {apps.map((a) => (
        <div className="border rounded p-3" key={a._id}>
          {editingId === a._id ? (
            /* ── Inline Edit Form ── */
            <div className="d-grid gap-2">
              <input
                className="form-control form-control-sm"
                placeholder="Company"
                name="company"
                value={editForm.company}
                onChange={onEditChange}
                required
                minLength={2}
              />
              <input
                className="form-control form-control-sm"
                placeholder="Role"
                name="role"
                value={editForm.role}
                onChange={onEditChange}
                required
                minLength={2}
              />
              <input
                className="form-control form-control-sm"
                type="url"
                placeholder="Job Link (optional)"
                name="link"
                value={editForm.link}
                onChange={onEditChange}
              />
              <input
                className="form-control form-control-sm"
                type="date"
                name="dateApplied"
                value={editForm.dateApplied}
                onChange={onEditChange}
              />
              <textarea
                className="form-control form-control-sm"
                placeholder="Notes"
                name="notes"
                value={editForm.notes}
                onChange={onEditChange}
                rows={2}
              />
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => saveEdit(a._id)}
                  disabled={
                    editForm.company?.trim().length < 2 ||
                    editForm.role?.trim().length < 2
                  }
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ── Read View ── */
            <>
              <div className="d-flex justify-content-between align-items-start gap-2">
                <div>
                  <div className="fw-semibold">{a.company}</div>
                  <div className="subtle">{a.role}</div>
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noreferrer">
                      Job Link
                    </a>
                  )}
                </div>

                <div className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => startEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 align-items-center mt-2">
                <span className="subtle">Status:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 160 }}
                  value={a.status}
                  onChange={(e) => onUpdateStatus(a._id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <span className="ms-auto subtle" style={{ fontSize: 12 }}>
                  Applied:{" "}
                  {a.dateApplied
                    ? new Date(a.dateApplied).toLocaleDateString()
                    : ""}
                </span>
              </div>

              {a.notes && (
                <div className="mt-2">
                  <div className="subtle" style={{ fontSize: 12 }}>
                    Notes
                  </div>
                  <div>{a.notes}</div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
