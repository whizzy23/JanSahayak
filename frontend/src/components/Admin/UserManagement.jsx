import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import AddUserForm from './AddUserForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const response = await authService.getAllUsers();
      console.log('Users response:', response);
      setUsers(response);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (userId) => {
    try {
      console.log('Verifying user:', userId);
      setError('');
      await authService.verifyUser(userId);
      console.log('User verified successfully');
      await fetchUsers();
    } catch (err) {
      console.error('Error verifying user:', err);
      setError(err.message || 'Failed to verify user');
    }
  };

  const handleRemove = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) {
      return;
    }
    try {
      console.log('Removing user:', userId);
      setError('');
      await authService.removeUser(userId);
      console.log('User removed successfully');
      await fetchUsers();
    } catch (err) {
      console.error('Error removing user:', err);
      setError(err.message || 'Failed to remove user');
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  const unverifiedUsers = users.filter(user => !user.isVerified);
  const verifiedAdmins = users.filter(user => user.isVerified && user.role === 'admin');
  const verifiedEmployees = users.filter(user => user.isVerified && user.role === 'employee');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New User
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="mb-6">
          <AddUserForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Unverified Users Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
          Pending Verifications ({unverifiedUsers.length})
        </h3>
        <div className="overflow-x-auto bg-gray-50 rounded-lg">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/3 px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Department</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Signup Date</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unverifiedUsers.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="w-1/3 px-4 py-3 text-sm text-gray-700 truncate">{user.email}</td>
                  <td className="w-1/6 px-4 py-3 text-sm text-gray-700 capitalize">{user.role}</td>
                  <td className="w-1/6 px-4 py-3 text-sm text-gray-700">{user.department || 'N/A'}</td>
                  <td className="w-1/6 px-4 py-3 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="w-1/6 px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerify(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleRemove(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {unverifiedUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-500">
                    No pending verifications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Admins Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
          Verified Administrators ({verifiedAdmins.length})
        </h3>
        <div className="overflow-x-auto bg-gray-50 rounded-lg">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-2/3 px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Signup Date</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {verifiedAdmins.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="w-2/3 px-4 py-3 text-sm text-gray-700 truncate">{user.email}</td>
                  <td className="w-1/6 px-4 py-3 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="w-1/6 px-4 py-3 text-sm">
                    <div className="flex justify-start">
                      <button
                        onClick={() => handleRemove(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {verifiedAdmins.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center text-sm text-gray-500">
                    No verified administrators
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Employees Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
          Verified Employees ({verifiedEmployees.length})
        </h3>
        <div className="overflow-x-auto bg-gray-50 rounded-lg">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/3 px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="w-1/3 px-4 py-3 text-left text-sm font-medium text-gray-600">Department</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Signup Date</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {verifiedEmployees.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="w-1/3 px-4 py-3 text-sm text-gray-700 truncate">{user.email}</td>
                  <td className="w-1/3 px-4 py-3 text-sm text-gray-700">{user.department}</td>
                  <td className="w-1/6 px-4 py-3 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="w-1/6 px-4 py-3 text-sm">
                    <div className="flex justify-start">
                      <button
                        onClick={() => handleRemove(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {verifiedEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-sm text-gray-500">
                    No verified employees
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 