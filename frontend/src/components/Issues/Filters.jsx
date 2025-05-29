const Filters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-start">
      {/* Department Filter */}
      <select
        className="p-2 border rounded-md cursor-pointer"
        value={filters.dept}
        onChange={(e) => setFilters({ ...filters, dept: e.target.value })}
      >
        <option value="">Filter by Dept</option>
        <option value="Water">Water</option>
        <option value="Electricity">Electricity</option>
        <option value="Roads">Road</option>
        <option value="Sanitation">Sanitation</option>
        <option value="Garbage Collection">Garbage Collection</option>
        <option value="Street Lights">Street Lights</option>
        <option value="Drainage">Drainage</option>
        <option value="Public Toilets">Public Toilets</option>
        <option value="Other">Other</option>
      </select>

      {/* Date Filter */}
      <input
        type="date"
        className="p-2 border rounded-md cursor-pointer"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />

      {/* Status Filter */}
      <select
        className="p-2 border rounded-md cursor-pointer"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Assigned">Assigned</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Resolution Filter */}
      <select
        className="p-2 border rounded-md cursor-pointer"
        value={filters.resolution}
        onChange={(e) => setFilters({ ...filters, resolution: e.target.value })}
      >
        <option value="">Filter by Resolution</option>
        <option value="Resolved">Resolved</option>
        <option value="Unresolved">Unresolved</option>
      </select>
    </div>
  );
};

export default Filters;