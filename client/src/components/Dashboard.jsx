export default function Dashboard({ counts }) {
  return (
    <div className="row g-3 mb-3">
      {Object.entries(counts).map(([k, v]) => (
        <div className="col-6 col-md-3" key={k}>
          <div className="soft-card p-3">
            <div className="subtle fw-semibold" style={{ fontSize: 13 }}>
              {k}
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>{v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

