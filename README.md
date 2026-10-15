# Member 4 — Admin Dashboard

**Owner:** Teammate 4

**Responsibilities:** overall metrics, search/filter, rejected/duplicate counts, all-complaint table, identify what requires backend support.

## Files
- `src/components/AdminDashboard.jsx`
- `src/components/AdminDashboard.css`

## Integration
```jsx
<AdminDashboard complaints={complaints} />
```
Keep the shared complaint data in the parent `App.jsx`. This dashboard should not maintain a separate copy of complaints.

# CampusCare integration contract

These are contribution modules for the same React + Vite project. Each teammate owns one feature module.

## Shared complaint object
```js
{
  id: 101,
  title: "Wi-Fi not working",
  description: "No connection in the library",
  location: "Library",
  category: "IT & Internet",
  department: "IT & Technical Support",
  approval: "Pending", // Pending | Approved | Rejected
  status: "New",       // New | In Progress | Resolved
  createdAt: new Date().toLocaleString()
}
```

## Integration approach
1. Keep one main `App.jsx` as the parent and keep the shared `complaints` array there.
2. Import each component into `App.jsx`.
3. Pass the shared data and callback functions as props; do not create separate complaint arrays inside each module.
4. Suggested props:
   - StudentPortal: `complaints`, `onSubmit`
   - ApprovalDashboard: `complaints`, `onDecision`
   - ServiceDesk: `complaints`, `onStatusChange`
   - AdminDashboard: `complaints`
5. Add the component CSS imports shown in each module file.

This is frontend-only. The parent app currently owns state. A Flask + MySQL backend can replace the parent state later.
