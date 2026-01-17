const statuses = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationList({
  apps,
  loading,
  statusFilter,
  onUpdateStatus,
  onDelete,
}) {
  return (
    <div className="card">
      <div className="card-header fw-semibold d-flex justify-content-between align-items-center">
        <span>List View</span>
        <span className="text-muted" style={{ fontSize: 13 }}>
          Filter: {statusFilter}
        </span>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-muted">Loading…</div>
        ) : apps.length === 0 ? (
          <div className="text-muted">No applications found.</div>
        ) : (
          <div className="d-grid gap-2">
            {apps.map((a) => (
              <div className="border rounded p-3" key={a._id}>
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <div className="fw-semibold">{a.company}</div>
                    <div className="text-muted">{a.role}</div>
                    {a.link && (
                      <a href={a.link} target="_blank" rel="noreferrer">
                        Job Link
                      </a>
                    )}
                  </div>

                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(a._id)}>
                    Delete
                  </button>
                </div>

                <div className="d-flex flex-wrap gap-2 align-items-center mt-2">
                  <span className="text-muted">Status:</span>
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

                  <span className="ms-auto text-muted" style={{ fontSize: 12 }}>
                    Applied: {a.dateApplied ? new Date(a.dateApplied).toLocaleDateString() : ""}
                  </span>
                </div>

                {a.notes && (
                  <div className="mt-2">
                    <div className="text-muted" style={{ fontSize: 12 }}>
                      Notes
                    </div>
                    <div>{a.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
