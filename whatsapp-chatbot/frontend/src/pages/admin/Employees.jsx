export default function Employees() {
  const aiSuggestion = "Employee #5: High availability score";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Employee Management</h2>

      <div className="flex justify-end gap-4 mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Add Employee</button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">Remove Employee</button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">AI Suggestion</h3>
        <p className="text-gray-600">{aiSuggestion}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">1</td>
              <td className="p-3">John Doe</td>
              <td className="p-3">
                <select className="p-2 border rounded-md w-full">
                  <option>Water</option>
                  <option>Road</option>
                </select>
              </td>
              <td className="p-3">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}