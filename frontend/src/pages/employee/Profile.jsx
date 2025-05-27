export default function Profile() {
  const mockHistory = [
    { id: 1, title: 'Water Supply Issue', resolvedDate: '2025-05-22' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-center text-blue-700">My Profile</h2>

        {/* Personal Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>

        {/* Resolved History */}
        <div className="bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-semibold p-4 border-b">Resolved Issues History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-blue-100">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Resolved Date</th>
                </tr>
              </thead>
              <tbody>
                {mockHistory.map((issue) => (
                  <tr key={issue.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{issue.id}</td>
                    <td className="px-4 py-3 font-medium">{issue.title}</td>
                    <td className="px-4 py-3">{issue.resolvedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
