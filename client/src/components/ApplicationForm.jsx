import { useState } from "react";

export default function ApplicationForm({ onCreate }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    link: "",
    status: "Applied",
    notes: "",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (form.company.trim().length < 2 || form.role.trim().length < 2) return;

    onCreate({
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
      link: form.link.trim(),
      notes: form.notes.trim(),
    });

    setForm({ company: "", role: "", link: "", status: "Applied", notes: "" });
  };

  return (
    <div className="card">
      <div className="card-header fw-semibold">Add Application</div>
      <div className="card-body">
        <form onSubmit={submit} className="d-grid gap-2">
          <input
            className="form-control"
            placeholder="Company (e.g., Amazon)"
            name="company"
            value={form.company}
            onChange={onChange}
            required
            minLength={2}
          />
          <input
            className="form-control"
            placeholder="Role (e.g., Software Engineer Intern)"
            name="role"
            value={form.role}
            onChange={onChange}
            required
            minLength={2}
          />
          <input
            className="form-control"
            placeholder="Job Link (optional)"
            name="link"
            value={form.link}
            onChange={onChange}
          />
          <select className="form-select" name="status" value={form.status} onChange={onChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <textarea
            className="form-control"
            placeholder="Notes (optional)"
            name="notes"
            value={form.notes}
            onChange={onChange}
            rows={3}
          />
          <button className="btn btn-primary">Save</button>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Company/Role must be at least 2 characters.
          </div>
        </form>
      </div>
    </div>
  );
}
