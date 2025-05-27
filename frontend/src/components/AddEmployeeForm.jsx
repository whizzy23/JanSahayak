import { useState } from 'react';

export default function AddEmployeeForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', password: '', department: '' });
  };

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-bold mb-4 text-center text-blue-700">Add New Employee</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Department</label>
          <select
            name="department"
            required
            value={formData.department}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Select department</option>
            <option value="Water">Water</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Garbage Collection">Garbage Collection</option>
            <option value="Street Lights">Street Lights</option>
            <option value="Drainage">Drainage</option>
            <option value="Public Toilets">Public Toilets</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
