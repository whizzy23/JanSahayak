import { useState } from 'react';
import AddEmployeeForm from '../../components/AddEmployeeForm';

export default function Employees() {
  const [showForm, setShowForm] = useState(false);

  const handleAddEmployee = (formData) => {
    console.log('Add Employee:', formData);
    // TODO: send formData to backend using axios.post(...)
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Employee Management</h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Employee
        </button>
      </div>

      {showForm && (
        <AddEmployeeForm
          onSubmit={handleAddEmployee}
          onCancel={() => setShowForm(false)}
        />
      )}
      <div className="bg-white rounded-xl shadow-lg w-3/4 mx-auto">
  <table className="w-full text-sm table-auto">
    <thead className="bg-blue-100 text-gray-700">
      <tr>
        <th className="px-2 py-3 text-left">ID</th>
        <th className="px-2 py-3 text-left">Name</th>
        <th className="px-2 py-3 text-left">Department</th>
        <th className="px-2 py-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t">
        <td className="px-2 py-3">1</td>
        <td className="px-2 py-3">John Doe</td>
        <td className="px-2 py-3">Water</td>
        <td className="px-2 py-3">
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md">
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

   
    </div>
  );
}
