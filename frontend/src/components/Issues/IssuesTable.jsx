export default function IssuesTable({ issues, openModal }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-blue-100 text-gray-700 text-center">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Department</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Urgency</th>
            <th className="p-3">View</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {issues.map(issue => (
            <tr key={issue._id} className="border-t align-middle">
              <td className="p-3">{issue.ticketId}</td>
              <td className="p-3">{issue.department}</td>
              <td className="p-3">{new Date(issue.timestamp).toLocaleDateString()}</td>
              <td className="p-3">{issue.status}</td>
              <td className="p-3">{issue.urgency}</td>
              <td className="p-3">
                <button
                  onClick={() => openModal(issue)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md cursor-pointer transition duration-200 shadow-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
