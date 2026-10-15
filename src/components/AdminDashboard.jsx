import { useMemo, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard({ complaints = [] }) {
  const [query, setQuery] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("All");
  const filtered = useMemo(() => complaints.filter(c => {
    const matchesText = `${c.id} ${c.title} ${c.location} ${c.category} ${c.department}`
      .toLowerCase().includes(query.toLowerCase());
    return matchesText && (approvalFilter === "All" || c.approval === approvalFilter);
  }), [complaints, query, approvalFilter]);

  const count = status => complaints.filter(c => c.status === status).length;
  const rejected = complaints.filter(c => c.approval === "Rejected").length;
  const duplicates = complaints.filter(c => c.duplicateOf).length;

  return <section className="admin-module">
    <div className="admin-head"><div><p className="admin-kicker">SYSTEM MANAGEMENT</p>
      <h2>Admin Dashboard</h2><p>Monitor campus service complaints across the workflow.</p></div>
      <span className="admin-live">SESSION DATA</span></div>
    <div className="admin-summary">
      <div><span>Total complaints</span><strong>{complaints.length}</strong></div>
      <div><span>New</span><strong>{count("New")}</strong></div>
      <div><span>In progress</span><strong>{count("In Progress")}</strong></div>
      <div><span>Resolved</span><strong>{count("Resolved")}</strong></div>
      <div><span>Rejected</span><strong>{rejected}</strong></div>
      <div><span>Possible duplicates</span><strong>{duplicates}</strong></div>
    </div>
    <div className="admin-filter-row">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ID, title, location, category..." aria-label="Search complaints"/>
      <select value={approvalFilter} onChange={e => setApprovalFilter(e.target.value)} aria-label="Filter by approval">
        <option>All</option><option>Pending</option><option>Approved</option><option>Rejected</option>
      </select>
    </div>
    {filtered.length === 0 ? <div className="admin-empty">No complaints match these filters.</div> :
      <div className="admin-table-wrap"><table><thead><tr>
        <th>ID</th><th>Title</th><th>Location</th><th>Destination</th><th>Approval</th><th>Status</th>
      </tr></thead><tbody>{filtered.map(c => <tr key={c.id}>
        <td>#{c.id}</td><td>{c.title}{c.duplicateOf && <small>Possible duplicate of #{c.duplicateOf}</small>}</td>
        <td>{c.location}</td><td>{c.department || "Needs Review"}</td><td>{c.approval}</td><td>{c.status}</td>
      </tr>)}</tbody></table></div>}
    <p className="admin-note">User/role management and persistent reports need backend/API support; this component displays the data passed by the parent.</p>
  </section>;
}
