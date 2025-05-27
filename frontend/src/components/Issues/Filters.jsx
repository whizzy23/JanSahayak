export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-start">
      <select className="p-2 border rounded-md" value={filters.dept} onChange={(e) => setFilters({ ...filters, dept: e.target.value })}>
        <option value="">Filter by Dept</option>
        <option value="Water">Water</option>
        <option value="Road">Road</option>
        <option value="Electricity">Electricity</option>
        <option value="Sanitation">Sanitation</option>
      </select>

      <input
        type="date"
        className="p-2 border rounded-md"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />

      <select className="p-2 border rounded-md" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Assigned">Assigned</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
}
